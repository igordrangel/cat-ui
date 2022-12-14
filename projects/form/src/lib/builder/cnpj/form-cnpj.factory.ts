import { CatFormTextOptions } from '../form.interface';
import { FormFieldBase } from '../form-field.base';
import { CatCnpjValidator } from '../../validators/cat-cnpj.validator';

export class FormCnpjFactory extends FormFieldBase<CatFormTextOptions> {
  constructor(label: string) {
    super(label);
    this.setValidators([CatCnpjValidator]);
  }
}
