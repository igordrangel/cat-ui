import { ValidatorFn, Validators } from '@angular/forms';
import { klArray } from '@koalarx/utils/operators/array';
import { CatFileValidator } from '../../validators/cat-file.validator';
import { FormFieldBase } from '../form-field.base';
import { CatFormFileOptions } from '../form.interface';

export class FormFileFactory extends FormFieldBase<CatFormFileOptions> {
  public setRequired(required = true) {
    this.config.required = required;
    this.setValidators([Validators.required]);
    return this;
  }

  public setMultiple(multiple = true) {
    this.config.multiple = multiple;
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

  public setExtensionsAccept(extensions: string[]) {
    this.config.accept = extensions;
    this.setValidators([CatFileValidator(this.config.accept)]);
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
