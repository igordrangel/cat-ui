import {
  CatFormFieldOptions,
  CatFormFieldTemplateGridType
} from './form.interface';
import { AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { koala } from '@koalarx/utils';
import { CatFormBehavior } from '../common/cat-form-behavior';

export abstract class FormFieldBase<ConfigType extends CatFormFieldOptions> {
  protected config: ConfigType = {} as ConfigType;

  constructor(label: string) {
    this.config.label = label;
    this.config.grid = 12;
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

  public setRequired(required = true) {
    this.config.required = required;
    this.setValidators([Validators.required]);
    return this;
  }

  public setHint(hint: string) {
    this.config.hint = hint;
    return this;
  }

  public grid(grid: CatFormFieldTemplateGridType) {
    this.config.grid = grid;
    return this;
  }

  public disabled(disabled = true) {
    this.config.disabled = disabled;
    return this;
  }

  public focus(focus = true) {
    this.config.focus = focus;
    return this;
  }

  public hidden(hidden = true) {
    this.config.hidden = hidden;
    return this;
  }

  public onChange(onChange: (value: any, behavior: CatFormBehavior) => void) {
    this.config.onChange = onChange;
    return this;
  }

  public generate() {
    return this.config;
  }
}
