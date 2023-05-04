import { Component, OnInit, signal } from '@angular/core';
import {
  CatDynamicComponent,
  CatDynamicComponentModule,
} from '@catrx/ui/dynamic-component';
import { HelloWorldComponent } from './hello-world.component';

@Component({
  standalone: true,
  imports: [HelloWorldComponent, CatDynamicComponentModule],
  styleUrls: ['./style.css'],
  template: `
    <cat-dynamic-component [component]="component()"></cat-dynamic-component>
  `,
})
export class PageDynamicComponentComponent implements OnInit {
  component = signal(
    new CatDynamicComponent(HelloWorldComponent, 'Olá Mundo!')
  );

  ngOnInit() {
    document.title = 'Exemplo | Componentes Dinâmicos';
  }
}
