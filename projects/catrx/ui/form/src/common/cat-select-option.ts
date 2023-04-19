import { Type } from '@angular/core';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';

export class CatSelectOption<T = any> extends CatDynamicComponent {
  constructor(component: Type<T>, option: any) {
    super(component, option);
  }
}
