import { FormInputFactory } from "./input/form-input.factory";

export class FormFieldService {
  public input(label: string) {
    return new FormInputFactory(label);
  }
}
