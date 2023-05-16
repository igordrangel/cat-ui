import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSwitcherComponent } from './input-switcher.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputSwitcherComponent],
  exports: [InputSwitcherComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class InputSwitcherModule {}
