import { CatFormTextOptions } from '../form.interface';
import { CatUrlValidator } from '../../validators/cat-url.validator';
import { FormFieldInputBase } from '../form-field-input.base';

export class FormUrlFactory extends FormFieldInputBase<CatFormTextOptions> {
  constructor(label: string) {
    super(label);
    this.setValidators([CatUrlValidator]);
  }
}
