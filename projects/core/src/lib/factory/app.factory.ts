import { AppAuthSettings, AppConfig, AppConfigLogotype, AppConfigMenu, AppNotificationsConfig, CatAuthMode } from "./app-config.interface";

export class AppFactory {
  private config = {} as AppConfig;

  constructor(appName: string, authSettings: AppAuthSettings) {
    this.config.authSettings = authSettings;
    this.config.appName = appName;
  }

  public setLogotype(options: AppConfigLogotype) {
    this.config.logotype = options;
    return this;
  }

  public enableDarkMode(enable = true) {
    this.config.darkMode = enable;
    return this;
  }

  public setSideMenu(options: AppConfigMenu) {
    this.config.sideBarMenu = options;
    return this;
  }

  public pushNotifications(config: AppNotificationsConfig) {
    this.config.pushNotifications = config;
    return this;
  }

  public generate() {
    return this.config;
  }
}
