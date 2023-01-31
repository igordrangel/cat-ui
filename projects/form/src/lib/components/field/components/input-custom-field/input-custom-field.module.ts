import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';
import { InputCustomFieldComponent } from './input-custom-field.component';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { CommonErrorsModule } from '../common/common-errors/common-errors.module';

@NgModule({
  declarations: [InputCustomFieldComponent],
  exports: [InputCustomFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldContentModule,
    CatDynamicComponentModule,
    CommonErrorsModule,
  ],
})
export class InputCustomFieldModule {}
