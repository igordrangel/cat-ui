import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CatToolbarConfig } from './cat-toolbar.interface';

@Component({
  selector: 'cat-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Input() config?: CatToolbarConfig;
  @Input() spaceBetween = true;

  constructor(public router: Router) {}
}
