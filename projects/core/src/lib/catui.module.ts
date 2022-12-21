import { AppContainerModule } from './components/app-container/app-container.module';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
  declarations: [],
  exports: [HttpClientModule, AppContainerModule],
  imports: [BrowserModule, HttpClientModule, AppContainerModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class CatUiModule {}
