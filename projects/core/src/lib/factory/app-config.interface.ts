import { Type } from "@angular/core";
import { CatDynamicComponent } from "@catrx/ui/dynamic-component";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { CatOAuth2TokenInterface } from "../services/token/cat-token.service";

export class CatLogotypeApp extends CatDynamicComponent {}

export interface AppContainerConfig {
  config: AppConfig;
  themeActive$: BehaviorSubject<CatThemeType>;
}

export interface AppConfig {
  appName: string;
  logotype: AppConfigLogotype;
  authSettings: AppAuthSettings;
  defaultTheme?: CatThemeType;
  darkMode?: boolean;
  sideBarMenu?: AppConfigMenu;
  pushNotifications?: AppNotificationsConfig;
}

export interface AppAuthSettings {
  autoAuth: boolean;
  openId?: {
    service: string;
  };
  jwt?: {
    loginComponent: Type<any>;
  };
  onAuth: (decodedToken: CatAppDecodedToken) => Observable<AppConfigMenu>;
}

export interface AppNotificationsConfig {
  getNotifications: Observable<AppNotification[]>;
  getPermissionToNotifyOnBrowser: boolean;
  intervalToGet: number;
  emptyTemplate?: CatDynamicComponent;
  onDelete: (id: number) => Observable<any>;
  onAllDelete: (ids: number[]) => Observable<any>;
}

export interface AppNotification {
  id: number;
  title: string;
  message: string;
  notifyOnBrowser: boolean;
  routerLink?: string;
}

export interface AppConfigLogotype {
  default: string;
  negative?: string;
}

export interface AppConfigMenu {
  modules?: AppConfigMenuModule[];
  tools?: AppConfigMenuTool[];
}

export interface AppConfigMenuModule {
  icon?: string;
  name: string;
  tools: AppConfigMenuTool[];
}

export interface AppConfigMenuTool {
  name: string;
  hasPermission: () => boolean;
  icon?: string;
  routerLink?: string;
  fnAction?: () => void;
}

export type CatThemeType = 'light' | 'dark';
export type CatAppDecodedToken = CatOAuth2TokenInterface | { [key: string]: any };
