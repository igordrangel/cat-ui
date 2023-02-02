import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipComponent } from './chip.component';

@NgModule({
  declarations: [ChipComponent],
  exports: [ChipComponent],
  imports: [CommonModule],
})
export class CatChipModule {}
