import { Type } from '@angular/core';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { CatFormCustomFieldOptions } from '../builder/form.interface';

export class CatFormCustomField<PropsType = any> extends CatDynamicComponent {
  constructor(
    component: Type<any>,
    options: CatFormCustomFieldOptions<PropsType>
  ) {
    super(component, options);
  }
}
