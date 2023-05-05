import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppContainerComponent } from './app-container.component';
import { MenuModule } from '../menu/menu.module';
import { CatLoaderModule } from '@catrx/ui/loader';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { RouterModule } from '@angular/router';
import { CatDropdownModule } from '@catrx/ui/dropdown';
import { CatTooltipModule } from '@catrx/ui/tooltip';
import { TemplateDesktopComponent } from './templates/desktop/template-desktop.component';
import { TemplateContainerComponent } from './templates/template-container.component';
import { TemplateMobileComponent } from './templates/mobile/template-mobile.component';

@NgModule({
  declarations: [
    AppContainerComponent,
    TemplateContainerComponent,
    TemplateDesktopComponent,
    TemplateMobileComponent,
  ],
  exports: [AppContainerComponent],
  imports: [
    CommonModule,
    MenuModule,
    CatLoaderModule,
    CatDynamicComponentModule,
    CatTooltipModule,
    CatDropdownModule,
    RouterModule,
  ],
})
export class AppContainerModule {}
