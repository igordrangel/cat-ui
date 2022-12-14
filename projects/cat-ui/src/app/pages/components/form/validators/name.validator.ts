import { AbstractControl } from "@angular/forms";
import { CatFormValidatorResponseFactory } from "../../../../../../../form/src/lib/cat-form-validator-response.factory";

export function nameValidator(control: AbstractControl) {
  if (!Number.isNaN(parseInt(control.value))) {
    return CatFormValidatorResponseFactory.generate('Este não é um nome válido.');
  }

  return null;
}
