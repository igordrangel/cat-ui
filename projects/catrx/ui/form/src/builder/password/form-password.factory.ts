import { CatFormPasswordOptions } from '../form.interface';
import { Validators } from '@angular/forms';
import { FormFieldInputBase } from '../form-field-input.base';

export class FormPasswordFactory extends FormFieldInputBase<CatFormPasswordOptions> {
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
