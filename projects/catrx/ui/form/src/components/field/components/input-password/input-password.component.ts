import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormPasswordOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-password[control][fieldConfig]',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css', '../../field.component.css'],
})
export class InputPasswordComponent extends FieldBase<
  CatFormPasswordOptions,
  HTMLInputElement
  > {
  showPassword = false;
}
