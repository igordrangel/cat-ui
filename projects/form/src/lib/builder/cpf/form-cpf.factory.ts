import { CatFormTextOptions } from '../form.interface';
import { CatCpfValidator } from '../../validators/cat-cpf.validator';
import { FormFieldInputBase } from '../form-field-input.base';

export class FormCpfFactory extends FormFieldInputBase<CatFormTextOptions> {
  constructor(label: string) {
    super(label);
    this.setValidators([CatCpfValidator]);
  }
}
