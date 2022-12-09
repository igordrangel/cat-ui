import { FormFieldBase } from "../form-field.base";
import { CatFormTextareaOptions } from "../form.interface";

export class FormTextareaFactory extends FormFieldBase<CatFormTextareaOptions> {
  constructor(label: string) {
    super(label);
  }

  public setRows(minRows: number, maxRows?: number) {
    this.config.minRows = minRows;
    this.config.maxRows = maxRows;
    return this;
  }
}
