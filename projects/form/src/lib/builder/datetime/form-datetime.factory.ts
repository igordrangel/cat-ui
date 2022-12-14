import { CatFormDatetimeOptions } from '../form.interface';
import { FormFieldBase } from '../form-field.base';
import { CatDateMinValidator } from '../../validators/cat-date-min.validator';
import { CatDateMaxValidator } from '../../validators/cat-date-max.validator';

export class FormDatetimeFactory extends FormFieldBase<CatFormDatetimeOptions> {
  constructor(label: string) {
    super(label);
  }

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
