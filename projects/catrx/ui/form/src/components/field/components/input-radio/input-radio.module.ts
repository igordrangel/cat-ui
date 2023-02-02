import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioComponent } from './input-radio.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputRadioComponent],
  exports: [InputRadioComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class InputRadioModule {}
