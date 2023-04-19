import { Observable } from 'rxjs/internal/Observable';
import { FormFieldInputBase } from '../form-field-input.base';
import { CatFormListOptions, CatFormSelectOptions } from '../form.interface';

export class FormSelectFactory extends FormFieldInputBase<CatFormSelectOptions> {
  public setOptions(
    options: CatFormListOptions[] | Observable<CatFormListOptions[]>
  ) {
    this.config.options = Array.isArray(options)
      ? new Observable((observe) => {
          observe.next(options as []);
          observe.complete();
        })
      : options;
    return this;
  }

  public setMultiple(multiple = true) {
    this.config.multiple = multiple;
    return this;
  }
}
