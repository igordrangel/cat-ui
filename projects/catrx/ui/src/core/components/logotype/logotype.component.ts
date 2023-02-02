import { Component } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';
import { AppContainerConfig } from '../../factory/app-config.interface';
import { CommonModule } from '@angular/common';

@Component({
  template: ` <img
    class="logotype"
    [src]="
      (data.themeActive$ | async) === 'dark' && data.config.logotype.negative
        ? data.config.logotype.negative
        : data.config.logotype.default
    "
    [alt]="'Logotipo' + data.config.appName"
  />`,
  standalone: true,
  imports: [CommonModule],
})
export class LogotypeComponent implements CatDynamicComponentDataInterface {
  data: AppContainerConfig;
}
