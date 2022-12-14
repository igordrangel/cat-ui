import { Component } from '@angular/core';
import { CatFormTextOptions } from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';

@Component({
  selector: 'cat-field-cpf[control][config]',
  templateUrl: './input-cpf.component.html',
  styleUrls: ['../../field.component.css']
})
export class InputCpfComponent extends FieldBase<
  CatFormTextOptions,
  HTMLInputElement
> {}
