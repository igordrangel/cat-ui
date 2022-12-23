import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppContainerComponent } from './app-container.component';
import { MenuModule } from '../menu/menu.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CatLoaderModule } from '@catrx/ui/loader';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [AppContainerComponent],
  exports: [AppContainerComponent],
  imports: [
    CommonModule,
    MenuModule,
    CatLoaderModule,
    MatTooltipModule,
    BsDropdownModule.forRoot()
  ],
})
export class AppContainerModule {}
