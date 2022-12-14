import { AbstractControl, ValidationErrors } from '@angular/forms';

export function CatDateMaxValidator(max: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && typeof max === 'string') {
      let value = control.value as string;
      if (value.indexOf('-') <= 0) {
        value = `2000-01-01 ${value}`;
      }
      if (max.indexOf('-') <= 0) {
        max = `2000-01-01 ${max}`;
      }

      if (new Date(value) > new Date(max)) {
        return { dateMax: { max } };
      }
    }
    return null;
  };
}
