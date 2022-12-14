import { CatFormNumberOptions } from "../form.interface";
import { FormFieldBase } from "../form-field.base";
import { Validators } from "@angular/forms";

export class FormNumberFactory extends FormFieldBase<CatFormNumberOptions> {
  constructor(label: string) {
    super(label);
  }

  public setMin(min: number) {
    this.config.min = min;
    this.setValidators([Validators.min(min)]);
    return this;
  }

  public setMax(max: number) {
    this.config.max = max;
    this.setValidators([Validators.max(max)]);
    return this;
  }
}
