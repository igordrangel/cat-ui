import { TokenFactory } from './../../factory/token.factory';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { delay } from '@koalarx/utils/operators/delay';
import { BehaviorSubject, interval, Subject, takeUntil } from 'rxjs';
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
  CatOAuth2TokenInterface,
  CatTokenService,
} from '../../services/token/cat-token.service';
import { first, startWith } from 'rxjs/operators';
import jwtEncode from 'jwt-encode';
import { Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { NotificationService } from '../../services/notifications/notification.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { LogotypeComponent } from '../logotype/logotype.component';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { CatOAuth2ConfigInterface } from '@catrx/ui/common';
import { CatLoggedUser } from '../../guard/cat-logged-user';

@Component({
  selector: 'cat-app-container[config]',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css'],
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

  constructor(
    private router: Router,
    private oauth2Service: CatOAuth2Service,
    private tokenService: CatTokenService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    if (window.matchMedia && this.config.darkMode) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.themeActive$.next('dark');
      } else {
        this.themeActive$.next('light');
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

  public collapseMenu() {
    this.menuCollapsed$.next(!this.menuCollapsed$.getValue());
  }

  public switchTheme() {
    const currentTheme = this.themeActive$.getValue();
    this.themeActive$.next(currentTheme === 'dark' ? 'light' : 'dark');
  }

  public logout(clearToken = false) {
    this.destroyLoggedSubscriptions$.next(true);
    this.intervalNotifications?.unsubscribe();
    this.logged$.next(false);
    if (clearToken) {
      this.tokenService.removeToken();
      this.oauth2Service.logout();

      this.username = null;
      this.userPicture$.next(null);

      this.router.navigate(['']);
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
                await delay(3000);
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
            location.pathname === '/'
          ) {
            this.router.navigate([this.config?.authSettings?.startedPage]);
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
          .then(async () => {
            await this.buildMenu();
            resolve(true);
          })
          .catch(() => {
            this.validatingScope$.next(true);
          });
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

              await delay(300);
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
    const user = this.tokenService.getDecodedToken<CatOAuth2TokenInterface>();
    if (user) {
      return new Date(user.expired) < new Date();
    }

    return true;
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
        responseType: 'code',
        clientId: config.clientId,
        scope: config.scope,
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
