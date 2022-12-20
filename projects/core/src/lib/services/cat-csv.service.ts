import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { UnparseData } from 'ngx-papaparse/lib/interfaces/unparse-data';
import { CatFileInterface } from '../interfaces/cat-file.interface';
import { CatObjectService } from './cat-object.service';

@Injectable({ providedIn: 'any' })
export class CatCsvService {
  constructor(private papa: Papa, private objectService: CatObjectService) {}

  public convertCsvToJson(file: CatFileInterface) {
    const csvContent = this.objectService.getContentOnFile(file);
    return this.papa.parse(csvContent, {
      header: true,
      delimiter: ';',
      newline: '\r\n',
      skipEmptyLines: true,
    }).data;
  }

  public convertJsonToCsv(json: UnparseData, filename: string = 'export') {
    this.downloadCsv(
      new Blob(
        [
          this.papa.unparse(json, {
            header: true,
            delimiter: ';',
            newline: '\r\n',
          }),
        ],
        {
          type: 'text/csv;charset=utf-8;',
        }
      ),
      filename
    );
  }

  private downloadCsv(blob: Blob, filename: string = 'export') {
    let link = document.createElement('a');
    let url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
