import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
})
export class TooltipComponent implements OnInit {
  tooltip: string = '';
  left: number = 0;
  top: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
