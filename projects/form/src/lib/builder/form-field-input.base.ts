import { CatFormFieldOptions } from './form.interface';
import { AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { koala } from '@koalarx/utils';
import { FormFieldBase } from './form-field.base';

export abstract class FormFieldInputBase<
  ConfigType extends CatFormFieldOptions
> extends FormFieldBase<ConfigType> {
  public setRequired(required = true) {
    this.config.required = required;
    this.setValidators([Validators.required]);
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
    this.config.validators = koala(this.config.validators)
      .array<ValidatorFn>()
      .merge(validators)
      .getValue();
    return this;
  }

  public setAsyncValidators(asyncValidators: AsyncValidatorFn[]) {
    if (!this.config.asyncValidators) this.config.asyncValidators = [];
    this.config.asyncValidators = koala(this.config.asyncValidators)
      .array<AsyncValidatorFn>()
      .merge(asyncValidators)
      .getValue();
    return this;
  }
}
