import { Component } from '@angular/core';
import { CatFormTextOptions } from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';

@Component({
  selector: 'cat-field-cnpj[control][config]',
  templateUrl: './input-cnpj.component.html',
  styleUrls: ['../../field.component.css']
})
export class InputCnpjComponent extends FieldBase<
  CatFormTextOptions,
  HTMLInputElement
> {}
