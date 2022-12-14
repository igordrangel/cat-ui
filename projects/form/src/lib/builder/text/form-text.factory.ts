import { CatFormTextOptions } from '../form.interface';
import { FormFieldBase } from '../form-field.base';
import { Validators } from '@angular/forms';

export class FormTextFactory extends FormFieldBase<CatFormTextOptions> {
  public setMinLength(minLength: number) {
    this.config.minLength = minLength;
    this.setValidators([Validators.minLength(minLength)]);
    return this;
  }

  public setMaxLength(maxLength: number) {
    this.config.maxLength = maxLength;
    this.setValidators([Validators.maxLength(maxLength)]);
    return this;
  }
}
