import { TokenFactory } from './../../factory/token.factory';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { klDelay } from '@koalarx/utils/operators/delay';
import {
  AppConfig,
  CatThemeType,
  AppConfigMenu,
  AppNotification,
  AppContainerConfig,
} from '../../factory/app-config.interface';
import { CatOAuth2Config } from '../../services/openid/cat-oauth2.config';
import { CatOAuth2Service } from '../../services/openid/cat-oauth2.service';
import {
  CatJwtTokenInterface,
  CatOAuth2TokenInterface,
  CatTokenService,
} from '../../services/token/cat-token.service';
import jwtEncode from 'jwt-encode';
import { Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { NotificationService } from '../../services/notifications/notification.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { LogotypeComponent } from '../logotype/logotype.component';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { CatOAuth2ConfigInterface } from '@catrx/ui/common';
import { CatLoggedUser } from '../../guard/cat-logged-user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { interval } from 'rxjs/internal/observable/interval';
import { first } from 'rxjs/internal/operators/first';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { startWith } from 'rxjs/internal/operators/startWith';
import { TemplateContainerComponent } from './templates/template-container.component';

@Component({
  selector: 'cat-app-container[config]',
  templateUrl: './app-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContainerComponent implements OnInit {
  @Input() config: AppConfig;

  public menuCollapsed$ = new BehaviorSubject<boolean>(true);
  public themeActive$ = new BehaviorSubject<CatThemeType>('light');
  public logged$ = new BehaviorSubject<boolean>(TokenFactory.hasToken());
  public validatingScope$ = new BehaviorSubject<boolean>(false);
  public errorLoadConfig$ = new BehaviorSubject<boolean>(false);
  public sideMenuConfig$ = new BehaviorSubject<AppConfigMenu>(null);
  public username: string;
  public userPicture$ = new BehaviorSubject<SafeUrl | null>(null);
  public loadingNotifications$ = new BehaviorSubject<boolean>(false);
  public notifications$ = new BehaviorSubject<AppNotification[] | null>(null);
  public forceLogin$ = new BehaviorSubject<boolean>(false);
  public loadingClaims$ = new BehaviorSubject<boolean>(false);

  private intervalNotifications?: Subscription;
  private destroyLoggedSubscriptions$ = new Subject<boolean>();
  private destroySubscriptions$ = new Subject<boolean>();

  @ViewChild('templateContainer') templateContainer: TemplateContainerComponent;

  constructor(
    private router: Router,
    private oauth2Service: CatOAuth2Service,
    private tokenService: CatTokenService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    if (window.matchMedia && this.config.darkMode) {
      const savedTheme = localStorage.getItem(
        this.getLocalStorageThemeName()
      ) as CatThemeType;

      if (savedTheme) {
        this.themeActive$.next(savedTheme);
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.themeActive$.next('dark');
        } else {
          this.themeActive$.next('light');
        }
      }
    } else {
      this.themeActive$.next(this.config.defaultTheme ?? 'light');
    }

    if (this.config.authSettings.openId) {
      this.startOpenID();
    }

    if (this.config.sideBarMenu) {
      this.sideMenuConfig$.next(this.config.sideBarMenu);
    }

    if (this.config.pushNotifications?.getPermissionToNotifyOnBrowser) {
      this.notificationService.requestPermission();
    }

    if (this.config.options?.menuStartState === 'closed') {
      this.menuCollapsed$.next(false);
    }

    this.startTokenFlow();
  }

  public switchTheme() {
    const currentTheme = this.themeActive$.getValue();
    this.themeActive$.next(currentTheme === 'dark' ? 'light' : 'dark');
    localStorage.setItem(
      this.getLocalStorageThemeName(),
      this.themeActive$.getValue()
    );
  }

  public logout(clearToken = false) {
    let isLogged = false

    if (this.config.authSettings.onLogout) {
      const logoutResponse = this.config.authSettings.onLogout(
        this.verifyTokenIsExpired()
      )
      isLogged = logoutResponse.isLogged
      clearToken = logoutResponse.clearToken
    }

    if (!isLogged) {
      this.destroyLoggedSubscriptions$.next(true);
      this.intervalNotifications?.unsubscribe();
      this.logged$.next(isLogged);
    }

    if (clearToken) {
      this.tokenService.removeToken();
      this.oauth2Service.logout();

      this.username = null;
      this.userPicture$.next(null);

      this.router.navigate(['/']);
    }
  }

  public login() {
    if (this.config.authSettings.openId) {
      this.oauth2Service.events.next('authenticate');
    } else if (this.config.authSettings.jwt) {
      this.forceLogin$.next(true);
    }
  }

  public logoutAndTryAgain() {
    this.errorLoadConfig$.next(false);
    this.logout(true);
  }

  public reloadNotifications() {
    this.intervalNotifications?.unsubscribe();
    this.loadingNotifications$.next(true);
    this.observeNotifications();
  }

  public removeNotification(id: number) {
    this.intervalNotifications?.unsubscribe();
    this.loadingNotifications$.next(true);
    this.config.pushNotifications
      .onDelete(id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.loadingNotifications$.next(false);
          this.observeNotifications();
        },
        error: (err) => {
          console.error(err);
          this.loadingNotifications$.next(false);
        },
      });
  }

  public removeAllNotifications() {
    this.intervalNotifications?.unsubscribe();
    this.loadingNotifications$.next(true);
    this.config.pushNotifications
      .onAllDelete(
        this.notifications$.getValue().map((notification) => notification.id)
      )
      .pipe(first())
      .subscribe({
        next: () => {
          this.loadingNotifications$.next(false);
          this.observeNotifications();
        },
        error: (err) => {
          console.error(err);
          this.loadingNotifications$.next(false);
        },
      });
  }

  public getLoginComponent() {
    if (this.config.authSettings.jwt) {
      return new CatDynamicComponent(
        this.config.authSettings.jwt.loginComponent,
        new CatDynamicComponent(LogotypeComponent, {
          config: this.config,
          themeActive$: this.themeActive$,
        } as AppContainerConfig)
      );
    }
    return null;
  }

  private getLocalStorageThemeName() {
    return `${this.getDefaultAliasStorageName()}:theme`;
  }

  private getDefaultAliasStorageName() {
    return `@${this.config.appName.replace(/ /g, '-').toLocaleLowerCase()}`;
  }

  private startOpenID() {
    if (!CatOAuth2Config.hasConfig()) {
      setTimeout(() => {
        if (this.config.authSettings.autoAuth) {
          this.oauth2Service.initLoginFlow(
            this.config.authSettings.openId.service
          );
        }
      }, 3000);
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
            if (this.config.authSettings.autoAuth) {
              if (event === 'logout') {
                await klDelay(3000);
                this.oauth2Service.events.next('authenticate');
              } else {
                this.oauth2Service.events.next('authenticate');
              }
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

          await this.getClaimsAndBuildMenu(true);

          if (
            this.config?.authSettings?.startedPage &&
            ((!location.hash && location.pathname === '/') ||
              (!!location.hash && location.hash === '#/'))
          ) {
            this.router.navigate([this.config?.authSettings?.startedPage()]);
          }
        }
      } else {
        this.logout();
        await this.getClaimsAndBuildMenu(false);
      }
    });
  }

  private getClaimsAndBuildMenu(logged: boolean) {
    return new Promise((resolve) => {
      if (logged) {
        this.getClaims()
          .then(() => this.buildMenu())
          .then(() => resolve(true))
          .catch(() => this.validatingScope$.next(true));
      } else {
        this.buildMenu().then();
      }
    });
  }

  private buildMenu() {
    return new Promise((resolve, reject) => {
      this.config.authSettings
        .onAuth(this.tokenService.getDecodedToken<CatOAuth2TokenInterface>())
        .pipe(first())
        .subscribe({
          next: async (sideMenuConfig) => {
            this.sideMenuConfig$.next(sideMenuConfig);

            if (TokenFactory.hasToken()) {
              this.username = this.tokenService.getOAuth2Token()?.login;

              if (this.config.authSettings.openId) {
                this.userPicture$.next(this.oauth2Service.getPicture());
              }

              interval(1)
                .pipe(takeUntil(this.destroyLoggedSubscriptions$))
                .subscribe(() => this.verifyToken());

              if (this.config.pushNotifications) {
                this.observeNotifications();
              }

              await klDelay(300);
              this.logged$.next(true);
              this.forceLogin$.next(false);
              resolve(true);
            }
          },
          error: reject,
        });
    });
  }

  private getClaims() {
    return new Promise((resolve, reject) => {
      if (this.config.authSettings.openId) {
        CatLoggedUser.claims = this.oauth2Service.getIdentityClaims();
        this.loadingClaims$.next(false);
        resolve(true);
      } else if (this.config.authSettings.jwt?.claims) {
        this.loadingClaims$.next(true);
        this.config.authSettings.jwt.claims.pipe(first()).subscribe({
          next: (claims) => {
            CatLoggedUser.claims = claims;
            this.forceLogin$.next(false);
            this.logged$.next(true);
            this.loadingClaims$.next(false);
            resolve(true);
          },
          error: (err) => {
            this.loadingClaims$.next(false);
            this.errorLoadConfig$.next(true);
            reject(err);
          },
        });
      } else {
        this.loadingClaims$.next(false);
        resolve(true);
      }
    });
  }

  private validatingScope() {
    return location.href.indexOf('/?state=') >= 0;
  }

  private verifyToken() {
    if (this.verifyTokenIsExpired()) {
      this.logout(true);
      this.oauth2Service.logout();
    }
  }

  private verifyTokenIsExpired() {
    const user = this.tokenService.getDecodedToken<
      CatOAuth2TokenInterface | CatJwtTokenInterface
    >();
    if (user) {
      const exp = user['expired'] ?? user['exp'];
      if (typeof exp === 'string') {
        return new Date(exp) < new Date();
      } else if (typeof exp === 'number') {
        return new Date(exp * 1000) < new Date();
      }
    }

    return false;
  }

  private observeNotifications() {
    this.intervalNotifications = interval(
      this.config.pushNotifications.intervalToGet
    )
      .pipe(startWith(0))
      .subscribe(() => this.pushNotifications());
  }

  private pushNotifications() {
    if (this.config.pushNotifications) {
      this.loadingNotifications$.next(true);
      this.config.pushNotifications.getNotifications.pipe(first()).subscribe({
        next: (notifications) => {
          if (notifications.length > 0) {
            notifications.forEach((notification) => {
              if (notification.notifyOnBrowser) {
                this.notificationService
                  .notify(notification.title, {
                    icon: this.config.logotype.default,
                    body: notification.message,
                  })
                  .subscribe((notify) => {
                    if (
                      notify.event.type === 'click' &&
                      notification.routerLink
                    ) {
                      this.router.navigate([notification.routerLink]);
                    }
                  });
              }
            });

            this.notifications$.next(notifications);
          } else {
            this.notifications$.next(null);
          }
          this.loadingNotifications$.next(false);
        },
        error: (err) => {
          console.error(err);
          this.notifications$.next(null);
          this.loadingNotifications$.next(false);
        },
      });
    }
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
        responseType: config.responseType ?? 'code',
        clientId: config.clientId,
        scope: config.scope,
        scopeName: config.scopeName ?? 'scope',
        issuer: config.domain,
        customQueryParams: config.customQueryParams,
        endpointToken: config.endpointToken ?? null,
        endpointClaims: config.endpointClaims ?? null,
        indexPictureName: config.indexPictureName,
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
