import { Component } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';

@Component({
  template: `<h2>{{ data.sigla }}</h2>`,
})
export class SelectOptionComponent implements CatDynamicComponentDataInterface {
  data: any;
}
