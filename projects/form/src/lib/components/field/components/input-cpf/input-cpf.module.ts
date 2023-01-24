import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCpfComponent } from './input-cpf.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [InputCpfComponent],
  exports: [InputCpfComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldContentModule,
    NgxMaskModule,
  ],
})
export class InputCpfModule {}
