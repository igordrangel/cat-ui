import { Component, OnInit } from '@angular/core';
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

  public async emitFiles(files: FileList | null) {
    if (files) {
      if (files?.length > 0) {
        for (let f = 0; f <= files.length; f++) {
          const file = files.item(f);
          if (file) {
            const fileResult = await this.convertFile(file);
            if (fileResult) {
              this.files.push(fileResult);
            }
          }
        }
      } else {
      }
    }

    if (this.control) this.control.setValue(this.files);
  }

  public getSupportedExtensions() {
    return koala(this.config?.accept ?? [])
      .array<string>()
      .toString()
      .getValue();
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
