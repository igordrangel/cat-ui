import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUrlComponent } from './input-url.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldContentModule } from '../common/field-content/field-content.module';

@NgModule({
  declarations: [InputUrlComponent],
  exports: [InputUrlComponent],
  imports: [CommonModule, ReactiveFormsModule, FieldContentModule]
})
export class InputUrlModule {}
