import { AbstractControl } from '@angular/forms';

export function CatUrlValidator(control: AbstractControl) {
  if (control.value) {
    try {
      Boolean(new URL(control.value));
    } catch (e) {
      return { url: true };
    }
  }
  return null;
}
