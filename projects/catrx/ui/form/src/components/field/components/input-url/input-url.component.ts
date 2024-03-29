import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormTextOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-url[control][fieldConfig]',
  templateUrl: 'input-url.component.html',
})
export class InputUrlComponent extends FieldBase<
  CatFormTextOptions,
  HTMLInputElement
> {}
