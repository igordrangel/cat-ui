import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormFileOptions } from '../../../../builder/form.interface';
import { CatFileInterface } from './cat-file.interface';
import { koala } from '@koalarx/utils';

@Component({
  selector: 'cat-field-file[control][config]',
  templateUrl: './input-file.component.html',
  styleUrls: ['../../field.component.css', './input-file.component.css'],
})
export class InputFileComponent extends FieldBase<
  CatFormFileOptions,
  HTMLInputElement
> {
  public files: CatFileInterface[] = [];
  public errorMultipleNotAllowed?: boolean;

  public async emitFiles(files: FileList | null) {
    if (files) {
      this.errorMultipleNotAllowed =
        !this.config?.multiple && (this.files.length > 0 || files.length > 1);

      if (
        !this.errorMultipleNotAllowed ||
        (this.config?.multiple && files?.length > 0)
      ) {
        for (let f = 0; f <= files.length; f++) {
          const file = files.item(f);
          if (file) {
            const fileResult = await this.convertFile(file);
            if (fileResult) {
              this.files.push(fileResult);
            }
          }
        }
        this.control?.setValue(this.files);
      }

      if (this.control) {
        this.control.markAsTouched();
        this.updateComponent$.next(true);
      }
    }
  }

  public getSupportedExtensions() {
    return koala(this.config?.accept ?? [])
      .array<string>()
      .toString()
      .getValue();
  }

  public hasValidExtension(filename: string) {
    if (this.config?.accept) {
      const fileExtension = filename.substring(filename.lastIndexOf('.'));
      return (
        this.config.accept
          .map((ext) => ext.toLowerCase())
          .indexOf(fileExtension.toLowerCase()) >= 0
      );
    }

    return true;
  }

  public removeFile(index: number) {
    this.files.splice(index, 1);
    this.control?.setValue(this.files);
  }

  private async convertFile(file: File): Promise<CatFileInterface | null> {
    const blobFile = await new Promise<string | ArrayBuffer | null>(
      (resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
      }
    );
    if (blobFile) {
      const fileSplit = blobFile.toString().split(';base64,');
      return {
        filename: file.name,
        type: fileSplit[0].replace('data:', ''),
        base64: fileSplit[1],
      };
    }

    return null;
  }
}
