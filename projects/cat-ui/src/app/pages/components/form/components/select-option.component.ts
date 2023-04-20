import { Component } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';

@Component({
  template: `{{ data.name }}`,
})
export class SelectOptionComponent implements CatDynamicComponentDataInterface {
  data: any;
}
