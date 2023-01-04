import { AppConfigMenuModule } from './../../../../factory/app-config.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cat-menu-module[modules]',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
})
export class ModuleComponent {
  @Input() modules: AppConfigMenuModule[];
}
