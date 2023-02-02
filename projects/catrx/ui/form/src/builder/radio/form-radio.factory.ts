import { FormFieldBase } from '../form-field.base';
import { CatFormListOptions, CatFormRadioOptions } from '../form.interface';

export class FormRadioFactory extends FormFieldBase<CatFormRadioOptions> {
  public setOptions(options: CatFormListOptions[]) {
    this.config.options = options;
    return this;
  }
}
