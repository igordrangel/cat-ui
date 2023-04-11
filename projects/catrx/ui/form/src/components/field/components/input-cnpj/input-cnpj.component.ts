import { Component } from '@angular/core';
import { CatFormTextOptions } from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';

@Component({
  selector: 'cat-field-cnpj[control][fieldConfig]',
  templateUrl: './input-cnpj.component.html',
})
export class InputCnpjComponent extends FieldBase<
  CatFormTextOptions,
  HTMLInputElement
> {}
