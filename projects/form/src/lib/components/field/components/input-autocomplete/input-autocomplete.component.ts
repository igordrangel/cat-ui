import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormSelectOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-autocomplete[control][config]',
  templateUrl: 'input-autocomplete.component.html',
  styleUrls: ['../../field.component.css'],
})
export class InputAutocompleteComponent extends FieldBase<
  CatFormSelectOptions,
  HTMLSelectElement
> {}
