import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFileComponent } from './input-file.component';
import { DragDropFileUploadDirective } from './drag-drop.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputFileComponent, DragDropFileUploadDirective],
  exports: [InputFileComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class InputFileModule {}
