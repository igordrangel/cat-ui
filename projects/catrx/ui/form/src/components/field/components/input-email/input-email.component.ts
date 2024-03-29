import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormTextOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-email[control][fieldConfig]',
  templateUrl: 'input-email.component.html',
})
export class InputEmailComponent extends FieldBase<
  CatFormTextOptions,
  HTMLInputElement
> {}
