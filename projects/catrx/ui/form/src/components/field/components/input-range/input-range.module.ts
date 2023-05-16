import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';
import { InputRangeComponent } from './input-range.component';

@NgModule({
  declarations: [InputRangeComponent],
  exports: [InputRangeComponent],
  imports: [CommonModule, ReactiveFormsModule, FieldContentModule],
})
export class InputRangeModule {}
