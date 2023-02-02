import { AbstractControl, ValidationErrors } from '@angular/forms';

export function CatDateMinValidator(min: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && typeof min === 'string') {
      let value = control.value as string;
      if (value.indexOf('-') <= 0) {
        value = `2000-01-01 ${value}`;
      }
      if (min.indexOf('-') <= 0) {
        min = `2000-01-01 ${min}`;
      }

      if (new Date(value) < new Date(min)) {
        return { dateMin: { min } };
      }
    }
    return null;
  };
}
