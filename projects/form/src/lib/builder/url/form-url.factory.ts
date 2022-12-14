import { CatFormTextOptions } from '../form.interface';
import { FormFieldBase } from '../form-field.base';
import { CatUrlValidator } from '../../validators/cat-url.validator';

export class FormUrlFactory extends FormFieldBase<CatFormTextOptions> {
  constructor(label: string) {
    super(label);
    this.setValidators([CatUrlValidator]);
  }
}
