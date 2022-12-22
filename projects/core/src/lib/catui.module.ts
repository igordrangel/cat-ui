import { AppContainerModule } from './components/app-container/app-container.module';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { CatAppService } from './services/app/cat-app.service';
import { CatEnvironment, CatEnvironmentInterface } from './environments/cat-environment';
import { CatOAuth2Service } from './services/openid/cat-oauth2.service';
import { CatAuthGuard } from './guard/cat-auth.guard';

registerLocaleData(ptBr);

@NgModule({
  declarations: [],
  exports: [HttpClientModule, AppContainerModule],
  imports: [BrowserModule, HttpClientModule, AppContainerModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    CatAppService,
    CatOAuth2Service,
    CatAuthGuard,
  ],
})
export class CatUiModule {
  static forRoot(
    environment: CatEnvironmentInterface
  ): ModuleWithProviders<CatUiModule> {
    environment.storageOAuthTypeName =
      environment.storageOAuthTypeName ?? 'catui_oauth_type';
    environment.storageTokenName =
      environment.storageTokenName ?? 'catui_token';

    CatEnvironment.environment = environment;

    return {
      ngModule: CatUiModule,
    };
  }
}
