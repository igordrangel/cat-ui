import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPasswordComponent } from './input-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';

@NgModule({
  declarations: [InputPasswordComponent],
  exports: [InputPasswordComponent],
  imports: [CommonModule, ReactiveFormsModule, FieldContentModule],
})
export class InputPasswordModule {}
