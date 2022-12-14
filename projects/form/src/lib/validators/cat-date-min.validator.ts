import { AbstractControl, ValidationErrors } from '@angular/forms';

export function CatDateMinValidator(min: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && typeof min === 'string') {
      if (new Date(control.value) < new Date(min)) {
        return { dateMin: true };
      }
    }
    return null;
  };
}
