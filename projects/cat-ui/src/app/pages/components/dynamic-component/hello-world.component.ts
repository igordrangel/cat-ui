import { Component } from "@angular/core";
import { CatDynamicComponentDataInterface } from "@cat-ui/dynamic-component";

@Component({
  templateUrl: 'hello-world.component.html'
})
export class HelloWorldComponent implements CatDynamicComponentDataInterface {
  public data?: string;
}
