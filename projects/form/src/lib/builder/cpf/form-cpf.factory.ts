import { CatFormTextOptions } from '../form.interface';
import { FormFieldBase } from '../form-field.base';
import { CatCpfValidator } from '../../validators/cat-cpf.validator';

export class FormCpfFactory extends FormFieldBase<CatFormTextOptions> {
  constructor(label: string) {
    super(label);
    this.setValidators([CatCpfValidator]);
  }
}
