import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormTextOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-text[control][fieldConfig]',
  templateUrl: 'input-text.component.html',
  styleUrls: ['../../field.component.css'],
})
export class InputTextComponent extends FieldBase<
  CatFormTextOptions,
  HTMLInputElement
> {}
