import { AbstractControl, ValidationErrors } from '@angular/forms';

export function CatDateMaxValidator(max: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && typeof max === 'string') {
      if (new Date(control.value) > new Date(max)) {
        return { dateMax: true };
      }
    }
    return null;
  };
}
