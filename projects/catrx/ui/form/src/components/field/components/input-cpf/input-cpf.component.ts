import { Component } from '@angular/core';
import { CatFormTextOptions } from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';

@Component({
  selector: 'cat-field-cpf[control][fieldConfig]',
  templateUrl: './input-cpf.component.html',
})
export class InputCpfComponent extends FieldBase<
  CatFormTextOptions,
  HTMLInputElement
> {}
