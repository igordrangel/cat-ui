import { ValidatorFn, Validators } from '@angular/forms';
import { klArray } from '@koalarx/utils/operators/array';
import { CatFileValidator } from '../../validators/cat-file.validator';
import { FormFieldBase } from '../form-field.base';
import { CatCsvModel, CatFormCsvOptions } from '../form.interface';

export class FormCsvFactory extends FormFieldBase<CatFormCsvOptions> {
  constructor(label: string) {
    super(label);
    this.config.accept = ['.csv'];
    this.setValidators([CatFileValidator(this.config.accept)]);
  }

  public setRequired(required = true) {
    this.config.required = required;
    if (required) this.setValidators([Validators.required]);
    return this;
  }

  public setModel(csvModel: CatCsvModel) {
    this.config.csvModel = csvModel;
    return this;
  }

  public setIcon(icon: string) {
    this.config.icon = icon;
    return this;
  }

  public setBtnText(text: string) {
    this.config.btnText = text;
    return this;
  }

  private setValidators(validators: ValidatorFn[]) {
    if (!this.config.validators) this.config.validators = [];
    this.config.validators = klArray(this.config.validators)
      .merge(validators)
      .getValue();
    return this;
  }
}
