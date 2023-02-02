import { Validators } from '@angular/forms';
import { FormFieldInputBase } from '../form-field-input.base';
import { CatFormTextareaOptions } from '../form.interface';

export class FormTextareaFactory extends FormFieldInputBase<CatFormTextareaOptions> {
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
