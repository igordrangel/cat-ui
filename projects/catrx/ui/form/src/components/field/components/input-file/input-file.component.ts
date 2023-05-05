import { Component } from '@angular/core';
import { CatFileInterface } from '@catrx/ui/utils';
import { CatCsvService } from '@catrx/ui/utils/csv';
import { klArray } from '@koalarx/utils/operators/array';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import {
  CatFormCsvOptions,
  CatFormCustomSelectedFileList,
  CatFormFileOptions,
} from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';

@Component({
  selector: 'cat-field-file[control][fieldConfig]',
  templateUrl: './input-file.component.html'
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

  protected override customInit(): void {
    this.control
      .valueChanges
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe((value: CatFileInterface | Array<CatFileInterface>) => {
        if (Array.isArray(value)) {
          this.files = klArray(this.files)
            .merge(value.filter(item => !this.files.find(file => item.filename === file.filename)))
            .getValue();
        } else if (value) {
          if (!this.files.find(file => value.filename === file.filename)) {
            this.files.push(value);
          }
        }
      })
  }

  public async emitFiles(files: FileList | null) {
    if (files) {
      this.errorMultipleNotAllowed =
        !this.fieldConfig?.multiple &&
        (this.files.length > 0 || files.length > 1);

      if (
        !this.errorMultipleNotAllowed ||
        (this.fieldConfig?.multiple && files?.length > 0)
      ) {
        for (let f = 0; f <= files.length; f++) {
          const file = files.item(f);
          if (file) {
            const fileResult = await this.convertFile(file);
            if (fileResult) {
              const indexFile = this.files.findIndex(file =>
                file.filename === fileResult.filename &&
                file.type === fileResult.type
              );
              if (indexFile >= 0) {
                this.files[indexFile] = fileResult;
              } else {
                this.files.push(fileResult);
              }
            }
          }
        }
        this.control?.setValue(
          this.fieldConfig?.multiple ? this.files : this.files?.[0]
        );
      }

      if (this.control) {
        this.control.markAsTouched();
        this.updateComponent$.next(true);
      }

      this.elInput.nativeElement.value = null;
    }
  }

  public getSupportedExtensions() {
    return klArray(this.fieldConfig?.accept ?? [])
      .toString()
      .getValue();
  }

  public hasValidExtension(filename: string) {
    if (this.fieldConfig?.accept) {
      const fileExtension = filename.substring(filename.lastIndexOf('.'));
      return (
        this.fieldConfig.accept
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
    return !!(this.fieldConfig as CatFormCsvOptions).csvModel;
  }

  public downloadCsvModel() {
    const csvModel = (this.fieldConfig as CatFormCsvOptions).csvModel;
    if (csvModel)
      this.csvService.convertJsonToCsv([csvModel.model], csvModel.filename);
  }

  public getFilesToCustomList() {
    return new CatDynamicComponent(this.fieldConfig.customSelectedFilesList, {
      data: this.files,
      remove: (index: number) => this.removeFile(index)
    } as CatFormCustomSelectedFileList);
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

      if (this.fieldConfig?.type === 'csv') {
        fileResult.csvContent = this.csvService.convertCsvToJson(fileResult);
      }

      return fileResult;
    }

    return null;
  }
}
