import { Component } from '@angular/core';
import { CatFormDateOptions } from 'projects/form/src/lib/builder/form.interface';
import { FieldBase } from '../field.base';

@Component({
  selector: 'cat-field-date[control][config]',
  templateUrl: './input-date.component.html',
  styleUrls: ['../../field.component.css'],
})
export class InputDateComponent extends FieldBase<
  CatFormDateOptions,
  HTMLInputElement
> {}
