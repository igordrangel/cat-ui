import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from './input-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';

@NgModule({
  declarations: [InputSelectComponent],
  exports: [InputSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldContentModule,
    NgSelectModule,
    CatDynamicComponentModule
  ],
})
export class InputSelectModule {}
