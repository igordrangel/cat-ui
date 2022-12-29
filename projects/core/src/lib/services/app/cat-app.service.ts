import { Injectable } from '@angular/core';
import { AppAuthSettings } from '../../factory/app-config.interface';
import { AppFactory } from '../../factory/app.factory';

@Injectable()
export class CatAppService {
  public build(appName: string, authSettings: AppAuthSettings) {
    return new AppFactory(appName, authSettings);
  }
}
