import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppContainerComponent } from './app-container.component';
import { MenuModule } from '../menu/menu.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CatLoaderModule } from '@catrx/ui/loader';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppContainerComponent],
  exports: [AppContainerComponent],
  imports: [
    CommonModule,
    MenuModule,
    CatLoaderModule,
    CatDynamicComponentModule,
    MatTooltipModule,
    BsDropdownModule.forRoot(),
    RouterModule
  ],
})
export class AppContainerModule {}