import { CatFormInputOptions } from "../form.interface";
import { FormFieldBase } from "../form-field.base";

export class FormInputFactory extends FormFieldBase<CatFormInputOptions>{
  constructor(label: string) {
    super(label);
  }
}
