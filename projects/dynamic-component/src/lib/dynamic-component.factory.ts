import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CatDynamicComponent } from './cat-dynamic-component';
import { DynamicComponentDirective } from './dynamic-component.directive';
import { CatDynamicComponentDataInterface } from './cat-dynamic-component-data.interface';

@Component({
  selector: 'cat-dynamic-component',
  template: `<ng-template catDynamicComponent></ng-template>`
})
export class DynamicComponentFactory implements OnInit {
  @Input() dynamicComponent?: CatDynamicComponent;

  @ViewChild(DynamicComponentDirective, {static: true}) dynamicComponentDirective?: DynamicComponentDirective;

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const dynamicComponent = this.dynamicComponent;
    if (dynamicComponent) {
      const viewContainerRef = this.dynamicComponentDirective?.viewContainerRef;
      viewContainerRef?.clear();

      const componentRef = viewContainerRef?.createComponent<CatDynamicComponentDataInterface>(dynamicComponent.component);
      const instance = componentRef?.instance;
      if (instance) instance.data = dynamicComponent.data;
    }
  }
}