import { Component, Input, OnInit } from '@angular/core';

export type CatIconButtonColor =
  'primary'
  | 'primary-inverse'
  | 'primary-bg-transparent'
  | 'danger'
  | 'danger-inverse'
  | 'danger-bg-transparent'
  | 'warning'
  | 'warning-inverse'
  | 'warning-bg-transparent';

@Component({
  selector: 'cat-icon-button',
  templateUrl: 'icon-button.component.html',
  styleUrls: ['icon-button.component.css']
})
export class IconButtonComponent implements OnInit {
  @Input() icon?: string;
  @Input() color?: CatIconButtonColor;
  @Input() tooltip?: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
