import { CatFormNumberOptions } from '../form.interface';
import { Validators } from '@angular/forms';
import { FormFieldInputBase } from '../form-field-input.base';

export class FormNumberFactory extends FormFieldInputBase<CatFormNumberOptions> {
  public setMin(min: number) {
    this.config.min = min;
    this.setValidators([Validators.min(min)]);
    return this;
  }

  public setMax(max: number) {
    this.config.max = max;
    this.setValidators([Validators.max(max)]);
    return this;
  }
}
