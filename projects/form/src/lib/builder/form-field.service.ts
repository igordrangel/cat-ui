import { FormInputFactory } from "./input/form-input.factory";
import { FormTextareaFactory } from "./textarea/form-textarea.factory";

export class FormFieldService {
  public input(label: string) {
    return new FormInputFactory(label);
  }

  public textarea(label: string) {
    return new FormTextareaFactory(label);
  }
}
