import { Component, Input, OnInit } from '@angular/core';
import { AppConfigMenu } from '../../factory/app-config.interface';

@Component({
  selector: 'cat-menu[config]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() config: AppConfigMenu;

  constructor() { }

  ngOnInit() {
  }

}
