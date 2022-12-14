import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCheckboxComponent } from './input-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputCheckboxComponent],
  exports: [InputCheckboxComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class InputCheckboxModule {}
