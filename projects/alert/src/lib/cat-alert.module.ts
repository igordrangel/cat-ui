import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatPrimaryButtonComponent } from '@catrx/ui/button';
import { CatDialogModule } from '@catrx/ui/dialog';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { AlertComponent } from './alert.component';
import { CatAlertService } from './cat-alert.service';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    CatDialogModule,
    CatDynamicComponentModule,
    CatPrimaryButtonComponent,
  ],
  providers: [CatAlertService],
})
export class CatAlertModule {}
