import { CatFormDatetimeOptions } from '../form.interface';
import { CatDateMinValidator } from '../../validators/cat-date-min.validator';
import { CatDateMaxValidator } from '../../validators/cat-date-max.validator';
import { FormFieldInputBase } from '../form-field-input.base';

export class FormDatetimeFactory extends FormFieldInputBase<CatFormDatetimeOptions> {
  public setMin(min: string) {
    this.config.min = min;
    this.setValidators([CatDateMinValidator(min)]);
    return this;
  }

  public setMax(max: string) {
    this.config.max = max;
    this.setValidators([CatDateMaxValidator(max)]);
    return this;
  }
}
