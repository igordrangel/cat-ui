import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormTextOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-search[control][fieldConfig]',
  templateUrl: './input-search.component.html',
  styleUrls: ['../../field.component.css'],
})
export class InputSearchComponent extends FieldBase<
  CatFormTextOptions,
  HTMLInputElement
> {}
