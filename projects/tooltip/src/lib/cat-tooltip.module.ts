import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { CatTooltipDirective } from './cat-tooltip.directive';

@NgModule({
  declarations: [TooltipComponent, CatTooltipDirective],
  imports: [CommonModule],
  exports: [CatTooltipDirective],
})
export class CatTooltipModule {}
