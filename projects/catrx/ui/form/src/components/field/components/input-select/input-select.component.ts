import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormSelectOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-select[control][fieldConfig]',
  templateUrl: 'input-select.component.html',
})
export class InputSelectComponent extends FieldBase<
  CatFormSelectOptions,
  HTMLSelectElement
> {}
