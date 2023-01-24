import { AbstractControl } from '@angular/forms';
import { CatFormValidatorResponseFactory } from '@catrx/ui/form';

export function nameValidator(control: AbstractControl) {
  if (!Number.isNaN(parseInt(control.value))) {
    return CatFormValidatorResponseFactory.generate(
      'Este não é um nome válido.'
    );
  }

  return null;
}
