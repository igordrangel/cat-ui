import { Observable } from "rxjs/internal/Observable";
import { CatOAuth2TokenInterface } from "../services/token/cat-token.service";

export interface AppConfig {
  appName: string;
  logotype: AppConfigLogotype;
  authSettings: AppAuthSettings;
  defaultTheme?: CatThemeType;
  darkMode?: boolean;
  sideBarMenu?: AppConfigMenu;
}

export interface AppAuthSettings {
  mode: CatAuthMode;
  autoAuth: boolean;
  service?: string;
  onAuth: (
    decodedToken: CatOAuth2TokenInterface | { [key: string]: any }
  ) => Observable<AppConfigMenu>;
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
  hasPermission: boolean;
  icon?: string;
  routerLink?: string;
  fnAction?: () => void;
}

export type CatAuthMode = 'jwt' | 'openId';
export type CatThemeType = 'light' | 'dark';
