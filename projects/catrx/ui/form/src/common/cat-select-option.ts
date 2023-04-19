import { Type } from '@angular/core';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { CatFormListOptions } from '../builder/form.interface';

export class CatSelectOption<T = any> extends CatDynamicComponent {
  constructor(component: Type<T>, option: CatFormListOptions) {
    super(component, option);
  }
}
