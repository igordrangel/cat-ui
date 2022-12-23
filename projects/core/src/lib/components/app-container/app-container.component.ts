import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { delay } from '@koalarx/utils/operators/delay';
import { BehaviorSubject, interval, Subject, takeUntil } from 'rxjs';
import { AppConfig, CatThemeType, AppConfigMenu } from '../../factory/app-config.interface';
import { CatOAuth2Config } from '../../services/openid/cat-oauth2.config';
import { CatOAuth2Service } from '../../services/openid/cat-oauth2.service';
import {
  CatOAuth2TokenInterface,
  CatTokenService,
} from '../../services/token/cat-token.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { first } from 'rxjs/operators';
import { TokenFactory } from '../../factory/token.factory';
import jwtEncode from 'jwt-encode';
import { Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { CatOAuth2ConfigInterface } from '../../services/openid/cat-oauth2-config.interface';

@Component({
  selector: 'cat-app-container[config]',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContainerComponent implements OnInit {
  @Input() config: AppConfig;

  public menuCollapsed$ = new BehaviorSubject<boolean>(false);
  public themeActive$ = new BehaviorSubject<CatThemeType>('light');
  public logged$ = new BehaviorSubject<boolean>(false);
  public validatingScope$ = new BehaviorSubject<boolean>(false);
  public errorLoadConfig$ = new BehaviorSubject<boolean>(false);
  public sideMenuConfig$ = new BehaviorSubject<AppConfigMenu>(null);
  public username: string;
  public userPicture$ = new BehaviorSubject<SafeUrl | null>(null);

  private intervalToken: Subscription;
  private destroySubscriptions$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private oauth2Service: CatOAuth2Service,
    private tokenService: CatTokenService
  ) {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.themeActive$.next('dark');
      } else {
        this.themeActive$.next('light');
      }
    }
  }

  ngOnInit() {
    if (this.config.authSettings.mode === 'openId') {
      this.startOpenID();
    }

    if (this.config.sideBarMenu) {
      this.sideMenuConfig$.next(this.config.sideBarMenu);
    }

    this.startTokenFlow();
  }

  public collapseMenu() {
    this.menuCollapsed$.next(!this.menuCollapsed$.getValue());
  }

  public switchTheme() {
    const currentTheme = this.themeActive$.getValue();
    this.themeActive$.next(currentTheme === 'dark' ? 'light' : 'dark');
  }

  public logout(clearToken = false) {
    this.intervalToken?.unsubscribe();
    this.logged$.next(false);
    if (clearToken) {
      this.tokenService.removeToken();
      this.oauth2Service.logout();
    }
  }

  private startOpenID() {
    if (!CatOAuth2Config.hasConfig()) {
      setTimeout(
        () =>
          this.oauth2Service.initLoginFlow(this.config.authSettings.service),
        3000
      );
    }

    this.oauth2Service.events.subscribe(async (event) => {
      switch (event) {
        case 'refreshToken':
          this.oauth2Service.initRefreshTokenInterval(
            this.tokenService.getOAuth2Token().code,
            this.tokenService.getOAuth2Token().refreshToken
          );
          break;
        case 'loadedConfig':
        case 'logout':
          if (
            (event === 'loadedConfig' &&
              !this.validatingScope() &&
              !this.tokenService.getOAuth2Token()) ||
            (event === 'logout' && !this.errorLoadConfig$.getValue())
          ) {
            if (event === 'logout') {
              await delay(3000);
              this.oauth2Service.events.next('authenticate');
            } else {
              this.oauth2Service.events.next('authenticate');
            }
          }
          break;
        case 'getTokenError':
        case 'errorLoadConfig':
          this.errorLoadConfig$.next(true);
          break;
      }
    });

    this.initOAuth2();
  }

  private startTokenFlow() {
    this.tokenService.getToken().subscribe(async (token) => {
      if (token) {
        if (this.verifyTokenIsExpired()) {
          this.logout(true);
        } else {
          this.oauth2Service.initRefreshTokenInterval(
            this.tokenService.getOAuth2Token().code,
            this.tokenService.getOAuth2Token().refreshToken
          );

          this.config.authSettings
            .onAuth(
              this.tokenService.getDecodedToken<CatOAuth2TokenInterface>()
            )
            .pipe(first())
            .subscribe(async (sideMenuConfig) => {
              this.username = this.tokenService.getOAuth2Token().login;
              this.userPicture$.next(this.oauth2Service.getPicture());

              this.sideMenuConfig$.next(sideMenuConfig);
              this.router.navigate(['']);
              this.intervalToken = interval(1).subscribe(() =>
                this.verifyToken()
              );
              await delay(300);
              this.logged$.next(true);
            });
        }
      } else {
        this.logout();
      }
    });
  }

  private validatingScope() {
    return location.href.indexOf('/?state=') >= 0;
  }

  public logoutAndTryAgain() {
    this.errorLoadConfig$.next(false);
    this.logout(true);
  }

  private verifyToken() {
    if (this.verifyTokenIsExpired()) {
      this.logout(true);
      this.oauth2Service.logout();
    }
  }

  private verifyTokenIsExpired() {
    const user = this.tokenService.getDecodedToken<CatOAuth2TokenInterface>();
    if (user) {
      return new Date(user.expired) < new Date();
    }

    return true;
  }

  private initOAuth2() {
    CatOAuth2Config.config.subscribe((config) => this.startConfig(config));
    if (CatOAuth2Config.hasConfig()) {
      CatOAuth2Config.setConfig(CatOAuth2Config.getConfig());
    }
  }

  private startConfig(config: CatOAuth2ConfigInterface) {
    if (config.clientId) {
      this.oauth2Service.configure({
        redirectUri: window.location.origin,
        redirectUriAfterAuth: '',
        responseType: 'code',
        clientId: config.clientId,
        scope: config.scope,
        issuer: config.domain,
        customQueryParams: config.customQueryParams,
        endpointToken: config.endpointToken ?? null,
        endpointClaims: config.endpointClaims ?? null,
        indexPictureName: config.indexPictureName
      });
      this.oauth2Service.loadDiscoveryDocumentAndTryLogin().then();

      this.oauth2Service.events
        .pipe(takeUntil(this.destroySubscriptions$))
        .subscribe((event) => {
          if (event === 'userAuthenticated' || event === 'refreshToken') {
            const claims = this.oauth2Service.getIdentityClaims();
            if (
              claims &&
              (!TokenFactory.hasToken() ||
                (TokenFactory.hasToken() && event === 'refreshToken'))
            ) {
              this.tokenService.setToken(
                jwtEncode(
                  {
                    accessToken: this.oauth2Service.getAccessToken(),
                    idToken: this.oauth2Service.getIdToken(),
                    refreshToken: this.oauth2Service.getRefreshToken(),
                    login: claims[config.indexLoginName] ?? 'Undefined',
                    expired: this.oauth2Service.getAccessTokenExpiration(),
                    code: this.oauth2Service.getCode(),
                  },
                  'secret'
                )
              );
            }

            if (event === 'userAuthenticated') {
              setTimeout(() => this.validatingScope$.next(false), 300);
            }
          } else if (event === 'getToken') {
            this.validatingScope$.next(true);
          }
        });
    }
  }
}
