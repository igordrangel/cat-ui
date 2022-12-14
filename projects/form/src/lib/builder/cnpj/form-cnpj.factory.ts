import { CatFormTextOptions } from '../form.interface';
import { CatCnpjValidator } from '../../validators/cat-cnpj.validator';
import { FormFieldInputBase } from '../form-field-input.base';

export class FormCnpjFactory extends FormFieldInputBase<CatFormTextOptions> {
  constructor(label: string) {
    super(label);
    this.setValidators([CatCnpjValidator]);
  }
}
