import {
  CatFormBehavior,
  CatFormFieldOptions,
  CatFormFieldTemplateGridType
} from "./form.interface";
import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { Subject } from "rxjs";

export abstract class FormFieldBase<ConfigType extends CatFormFieldOptions> {
  protected config: ConfigType = {} as ConfigType;

  protected constructor(label: string) {
    this.config.label = label;
    this.config.grid = 12;
  }

  public setValidators(validators: ValidatorFn[]) {
    this.config.validators = validators;
    return this;
  }

  public setAsyncValidators(asyncValidators: AsyncValidatorFn[]) {
    this.config.asyncValidators = asyncValidators;
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

  public onChange(onChange: (value: any, behavior: Subject<CatFormBehavior>) => void) {
    this.config.onChange = onChange;
    return this;
  }

  public generate() {
    return this.config;
  }
}
