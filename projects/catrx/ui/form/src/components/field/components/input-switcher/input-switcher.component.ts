import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormCheckboxOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-switcher[control][fieldConfig]',
  templateUrl: 'input-switcher.component.html',
})
export class InputSwitcherComponent extends FieldBase<
  CatFormCheckboxOptions,
  HTMLInputElement
> {}
