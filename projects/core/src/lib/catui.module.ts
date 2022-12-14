import { AppContainerModule } from './components/app-container/app-container.module';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { CatAppService } from './services/app/cat-app.service';
import { CatOAuth2Service } from './services/openid/cat-oauth2.service';
import { CatAuthGuard } from './guard/cat-auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatEnvironment, CatEnvironmentInterface } from '@catrx/ui/common';
import { CatXlsxConfig, CatXlsxConfigInterface } from '@catrx/ui/utils';

registerLocaleData(ptBr);

@NgModule({
  exports: [HttpClientModule, AppContainerModule],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppContainerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    CatAppService,
    CatOAuth2Service,
    CatAuthGuard,
  ],
})
export class CatUiModule {
  static forRoot(
    environment: CatEnvironmentInterface,
    options?: {
      xlsxConfig?: CatXlsxConfigInterface;
    }
  ): ModuleWithProviders<CatUiModule> {
    environment.storageOpenIDTypeName =
      environment.storageOpenIDTypeName ?? 'catui_oauth_type';
    environment.storageTokenName =
      environment.storageTokenName ?? 'catui_token';

    CatEnvironment.environment = environment;

    if (options?.xlsxConfig) {
      CatXlsxConfig.config = options.xlsxConfig;
    }

    return {
      ngModule: CatUiModule,
    };
  }
}
