import { Component } from "@angular/core";
import { CatDynamicComponentDataInterface } from '../../../../../../dynamic-component/src/lib/cat-dynamic-component-data.interface';

@Component({
  template: `<h2>{{data}}</h2>`
})
export class SideWindowExampleComponent implements CatDynamicComponentDataInterface {
  data: string;
}
