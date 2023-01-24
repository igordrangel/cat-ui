import { Component, OnInit } from '@angular/core';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { HelloWorldComponent } from './hello-world.component';

@Component({
  templateUrl: 'page-dynamic-component.component.html',
})
export class PageDynamicComponentComponent implements OnInit {
  component = new CatDynamicComponent(HelloWorldComponent, 'Olá Mundo!');

  ngOnInit() {
    document.title = 'Exemplo | Componentes Dinâmicos';
  }
}
