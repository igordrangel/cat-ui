import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDateComponent } from './input-date.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FieldContentModule],
  declarations: [InputDateComponent],
  exports: [InputDateComponent],
})
export class InputDateModule {}
