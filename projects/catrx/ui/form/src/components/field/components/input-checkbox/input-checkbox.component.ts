import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormCheckboxOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-checkbox[control][fieldConfig]',
  templateUrl: 'input-checkbox.component.html',
})
export class InputCheckboxComponent extends FieldBase<
  CatFormCheckboxOptions,
  HTMLInputElement
> {}
