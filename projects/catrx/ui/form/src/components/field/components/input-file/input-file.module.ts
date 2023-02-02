import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFileComponent } from './input-file.component';
import { DragDropFileUploadDirective } from './drag-drop.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonErrorsModule } from '../common/common-errors/common-errors.module';

@NgModule({
  declarations: [InputFileComponent, DragDropFileUploadDirective],
  exports: [InputFileComponent],
  imports: [CommonModule, ReactiveFormsModule, CommonErrorsModule],
})
export class InputFileModule {}
