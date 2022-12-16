import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAutocompleteComponent } from './input-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';

@NgModule({
  declarations: [InputAutocompleteComponent],
  exports: [InputAutocompleteComponent],
  imports: [CommonModule, ReactiveFormsModule, FieldContentModule],
})
export class InputAutocompleteModule {}
