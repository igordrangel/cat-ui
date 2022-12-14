import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormNumberOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-number[control][config]',
  templateUrl: 'input-number.component.html',
  styleUrls: ['../../field.component.css'],
})
export class InputNumberComponent extends FieldBase<
  CatFormNumberOptions,
  HTMLInputElement
> {}
