import { Component } from '@angular/core';
import { CatTooltipPosition } from './cat-tooltip.directive';

@Component({
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
})
export class TooltipComponent {
  tooltip = '';
  left = 0;
  top = 0;
  position: CatTooltipPosition = 'above';
  visible = false;
}
