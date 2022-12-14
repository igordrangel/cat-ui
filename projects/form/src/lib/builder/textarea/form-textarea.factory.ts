import { Validators } from '@angular/forms';
import { FormFieldBase } from '../form-field.base';
import { CatFormTextareaOptions } from '../form.interface';

export class FormTextareaFactory extends FormFieldBase<CatFormTextareaOptions> {
  public setRows(minRows: number, maxRows?: number) {
    this.config.minRows = minRows;
    this.config.maxRows = maxRows;
    return this;
  }

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
