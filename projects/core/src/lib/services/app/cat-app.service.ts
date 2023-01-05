import { Injectable } from '@angular/core';
import { AppAuthSettings, AppOptions } from '../../factory/app-config.interface';
import { AppFactory } from '../../factory/app.factory';

@Injectable()
export class CatAppService {
  public build(
    appName: string,
    authSettings: AppAuthSettings,
    options?: AppOptions
  ) {
    return new AppFactory(appName, authSettings, options);
  }
}
