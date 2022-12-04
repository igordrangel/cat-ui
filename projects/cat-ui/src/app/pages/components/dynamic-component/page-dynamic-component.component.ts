import { Component } from "@angular/core";
import { CatDynamicComponent } from "@cat-ui/dynamic-component";
import { HelloWorldComponent } from "./hello-world.component";

@Component({
  templateUrl: 'page-dynamic-component.component.html'
})
export class PageDynamicComponentComponent {
  component = new CatDynamicComponent(HelloWorldComponent, 'Olá Mundo!');
}
