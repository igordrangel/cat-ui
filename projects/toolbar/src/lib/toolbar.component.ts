import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatToolbarConfig } from './cat-toolbar.interface';

@Component({
  selector: 'cat-toolbar[config]',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() config: CatToolbarConfig;

  constructor(public router: Router) { }
}
