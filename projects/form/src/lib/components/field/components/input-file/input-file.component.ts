import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import {
  CatFormCsvOptions,
  CatFormFileOptions,
} from '../../../../builder/form.interface';
import { CatFileInterface } from './cat-file.interface';
import { koala } from '@koalarx/utils';
import { CatCsvService } from '@cat-ui/core';

@Component({
  selector: 'cat-field-file[control][config]',
  templateUrl: './input-file.component.html',
  styleUrls: ['../../field.component.css', './input-file.component.css'],
})
export class InputFileComponent extends FieldBase<
  CatFormFileOptions | CatFormCsvOptions,
  HTMLInputElement
> {
  public files: CatFileInterface[] = [];
  public errorMultipleNotAllowed?: boolean;

  constructor(private csvService: CatCsvService) {
    super();
  }

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
              const indexFile = koala(this.files)
                .array()
                .getIndex('filename', fileResult.filename);
              if (indexFile >= 0) {
                this.files[indexFile] = fileResult;
              } else {
                this.files.push(fileResult);
              }
            }
          }
        }
        this.control?.setValue(
          this.config?.multiple ? this.files : this.files?.[0]
        );
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

  public hasCsvModel() {
    return !!(this.config as CatFormCsvOptions).csvModel;
  }

  public downloadCsvModel() {
    const csvModel = (this.config as CatFormCsvOptions).csvModel;
    if (csvModel)
      this.csvService.convertJsonToCsv([csvModel.model], csvModel.filename);
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
      const fileResult: CatFileInterface = {
        filename: file.name,
        type: fileSplit[0].replace('data:', ''),
        base64: fileSplit[1],
      };

      if (this.config?.type === 'csv') {
        fileResult.csvContent = this.csvService.convertCsvToJson(fileResult);
      }

      return fileResult;
    }

    return null;
  }
}