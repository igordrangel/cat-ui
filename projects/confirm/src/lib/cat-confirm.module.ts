import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatConfirmService } from './cat-confirm.service';
import { ConfirmComponent } from './confirm.component';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { CatDialogModule } from '@catrx/ui/dialog';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [
    CommonModule,
    CatDialogModule,
    CatDynamicComponentModule
  ],
  providers: [CatConfirmService]
})
export class CatConfirmModule { }
