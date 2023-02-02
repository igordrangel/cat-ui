import { Observable } from 'rxjs/internal/Observable';
import { FormFieldInputBase } from '../form-field-input.base';
import {
  CatFormListOptions,
  CatFormAutocompleteOptions,
  CatFormAutocompleteAddOption,
} from '../form.interface';

export class FormAutocompleteFactory extends FormFieldInputBase<CatFormAutocompleteOptions> {
  public setOptions(
    options:
      | Observable<CatFormListOptions[]>
      | ((filter: any) => Observable<CatFormListOptions[]>)
  ) {
    this.config.options = options;
    return this;
  }

  public setMultiple(multiple = true) {
    this.config.multiple = multiple;
    return this;
  }

  public setAddOption(options?: CatFormAutocompleteAddOption) {
    this.config.add = true;
    this.config.addOption = options;
    return this;
  }
}
