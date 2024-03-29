import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormNumberOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-number[control][fieldConfig]',
  templateUrl: 'input-number.component.html',
})
export class InputNumberComponent extends FieldBase<
  CatFormNumberOptions,
  HTMLInputElement
> {}
