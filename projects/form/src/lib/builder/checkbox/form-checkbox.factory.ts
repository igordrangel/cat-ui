import { FormFieldBase } from '../form-field.base';
import { CatFormCheckboxOptions } from '../form.interface';

export class FormCheckboxFactory extends FormFieldBase<CatFormCheckboxOptions> {
  constructor(label: string) {
    super(label);
    this.setValue(false);
  }
}
