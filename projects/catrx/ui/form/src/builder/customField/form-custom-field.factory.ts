import { Type } from '@angular/core';
import { ValidatorFn, Validators, FormControl } from '@angular/forms';
import { klArray } from '@koalarx/utils/operators/array';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CatFormCustomField } from '../../common/cat-form-custom-field';
import { FormFieldBase } from '../form-field.base';
import { CatFormCustomFieldOptions } from '../form.interface';

export class FormCustomFieldFactory<PropsType> extends FormFieldBase<
  CatFormCustomFieldOptions<PropsType>
> {
  constructor(label: string, props: PropsType, component: Type<any>) {
    super(label);
    this.config.fieldProps = props;
    this.config.fieldComponent = new CatFormCustomField(component, this.config);
    this.config.control$ = new BehaviorSubject<FormControl>(null);
  }

  public setRequired(required = true) {
    this.config.required = required;
    if (required) this.setValidators([Validators.required]);
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
