import { AbstractControl } from '@angular/forms';
import { CatFileInterface } from '@catrx/ui/core';

export function CatFileValidator(validExtensions: string[]) {
  return (control: AbstractControl) => {
    const value: CatFileInterface[] | CatFileInterface | null =
      control.value as CatFileInterface[] | null;
    const files = value ? (Array.isArray(value) ? value : [value]) : null;

    if (files) {
      const invalid =
        files.filter((file) => {
          const fileExtension = file.filename.substring(
            file.filename.lastIndexOf('.')
          );
          return (
            validExtensions
              .map((ext) => ext.toLowerCase())
              .indexOf(fileExtension.toLowerCase()) < 0
          );
        }).length > 0;

      if (invalid) {
        return { fileInvalid: true };
      }
    }

    return null;
  };
}
