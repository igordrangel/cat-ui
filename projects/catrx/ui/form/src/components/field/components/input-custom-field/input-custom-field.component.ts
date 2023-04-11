import { CatFormCustomFieldOptions } from './../../../../builder/form.interface';
import { Component } from '@angular/core';
import { FieldBase } from '../field.base';

@Component({
  selector: 'cat-field-custom[control][fieldConfig]',
  templateUrl: './input-custom-field.component.html',
})
export class InputCustomFieldComponent extends FieldBase<
  CatFormCustomFieldOptions,
  HTMLInputElement
> {
  protected override customInit(): void {
    this.fieldConfig.control$.next(this.control);
  }
}
