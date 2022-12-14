import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormRadioOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-radio[control][config]',
  templateUrl: 'input-radio.component.html',
  styleUrls: ['../../field.component.css', './input-radio.component.css']
})
export class InputRadioComponent extends FieldBase<
  CatFormRadioOptions,
  HTMLInputElement
> {}
