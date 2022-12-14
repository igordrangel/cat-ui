import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormCheckboxOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-checkbox[control][config]',
  templateUrl: 'input-checkbox.component.html',
  styleUrls: ['../../field.component.css', './input-checkbox.component.css']
})
export class InputCheckboxComponent extends FieldBase<
  CatFormCheckboxOptions,
  HTMLInputElement
> {}
