import { Component } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';

@Component({
  standalone: true,
  template: ` <h1>{{ data }}</h1> `,
})
export class HelloWorldComponent implements CatDynamicComponentDataInterface {
  public data?: string;
}
