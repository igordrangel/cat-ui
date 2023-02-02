import { NgModule } from '@angular/core';
import { InputTextComponent } from './input-text.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [InputTextComponent],
  exports: [InputTextComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldContentModule,
    NgxMaskModule,
  ],
})
export class InputTextModule {}
