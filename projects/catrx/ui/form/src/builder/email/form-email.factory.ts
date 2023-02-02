import { CatFormTextOptions } from '../form.interface';
import { Validators } from '@angular/forms';
import { FormFieldInputBase } from '../form-field-input.base';

export class FormEmailFactory extends FormFieldInputBase<CatFormTextOptions> {
  constructor(label: string) {
    super(label);
    this.setValidators([Validators.email]);
  }
}
