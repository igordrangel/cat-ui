import { CatFormFieldOptions } from './form.interface';
import { AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { FormFieldBase } from './form-field.base';
import { klArray } from '@koalarx/utils/operators/array';

export abstract class FormFieldInputBase<ConfigType extends CatFormFieldOptions> extends FormFieldBase<ConfigType> {
  public setPlaceholder(text: string) {
    this.config.placeholder = text;
    return this;
  }

  public setRequired(required = true) {
    this.config.required = required;
    if (required) this.setValidators([Validators.required]);
    return this;
  }

  public setHint(hint: string) {
    this.config.hint = hint;
    return this;
  }

  public focus(focus = true) {
    this.config.focus = focus;
    return this;
  }

  public setValidators(validators: ValidatorFn[]) {
    if (!this.config.validators) this.config.validators = [];
    this.config.validators = klArray(this.config.validators)
      .merge(validators)
      .getValue();
    return this;
  }

  public setAsyncValidators(asyncValidators: AsyncValidatorFn[]) {
    if (!this.config.asyncValidators) this.config.asyncValidators = [];
    this.config.asyncValidators = klArray(this.config.asyncValidators)
      .merge(asyncValidators)
      .getValue();
    return this;
  }
}
