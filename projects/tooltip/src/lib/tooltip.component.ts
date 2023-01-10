import { Component, OnInit } from '@angular/core';
import { CatTooltipPosition } from './cat-tooltip.directive';

@Component({
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
})
export class TooltipComponent implements OnInit {
  tooltip: string = '';
  left: number = 0;
  top: number = 0;
  position: CatTooltipPosition = 'above';
  visible = false;

  constructor() {}

  ngOnInit(): void {}
}
