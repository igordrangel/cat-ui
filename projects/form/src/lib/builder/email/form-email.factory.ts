import { CatFormTextOptions } from '../form.interface';
import { FormFieldBase } from '../form-field.base';
import { Validators } from '@angular/forms';

export class FormEmailFactory extends FormFieldBase<CatFormTextOptions> {
  constructor(label: string) {
    super(label);
    this.setValidators([Validators.email]);
  }
}
