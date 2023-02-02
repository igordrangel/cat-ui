import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSearchComponent } from './input-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';

@NgModule({
  declarations: [InputSearchComponent],
  exports: [InputSearchComponent],
  imports: [CommonModule, ReactiveFormsModule, FieldContentModule],
})
export class InputSearchModule {}
