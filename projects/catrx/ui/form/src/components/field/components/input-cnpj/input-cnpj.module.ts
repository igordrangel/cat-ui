import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCnpjComponent } from './input-cnpj.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { FieldContentModule } from '../common/field-content/field-content.module';

@NgModule({
  declarations: [InputCnpjComponent],
  exports: [InputCnpjComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldContentModule,
    NgxMaskDirective,
  ],
})
export class InputCnpjModule {}
