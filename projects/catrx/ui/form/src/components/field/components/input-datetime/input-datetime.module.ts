import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDatetimeComponent } from './input-datetime.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FieldContentModule],
  declarations: [InputDatetimeComponent],
  exports: [InputDatetimeComponent],
})
export class InputDatetimeModule {}
