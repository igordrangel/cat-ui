import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatDialogService } from './cat-dialog.service';
import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  exports: [DialogComponent],
  imports: [
    CommonModule
  ],
  providers: [CatDialogService]
})
export class CatDialogModule { }
