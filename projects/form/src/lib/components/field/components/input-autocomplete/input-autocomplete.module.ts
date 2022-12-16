import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAutocompleteComponent } from './input-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [InputAutocompleteComponent],
  exports: [InputAutocompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldContentModule,
    NgSelectModule,
  ],
})
export class InputAutocompleteModule {}
