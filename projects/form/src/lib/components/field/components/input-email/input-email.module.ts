import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputEmailComponent } from './input-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';

@NgModule({
  declarations: [InputEmailComponent],
  exports: [InputEmailComponent],
  imports: [CommonModule, ReactiveFormsModule, FieldContentModule]
})
export class InputEmailModule {}
