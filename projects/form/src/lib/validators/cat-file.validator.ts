import { AbstractControl } from '@angular/forms';
import { CatFileInterface } from '../components/field/components/input-file/cat-file.interface';

export function CatFileValidator(
  control: AbstractControl,
  validExtensions: string[]
) {
  const files: CatFileInterface[] | null = control.value as
    | CatFileInterface[]
    | null;

  if (files) {
    const invalid = files.filter((file) => {
      const fileExtension = file.filename.substring(
        file.filename.lastIndexOf('.')
      );
      return validExtensions.indexOf(fileExtension) >= 0;
    });

    if (invalid) {
      return { fileInvalid: true };
    }
  }

  return null;
}
