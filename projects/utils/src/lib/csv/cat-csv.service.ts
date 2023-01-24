import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { UnparseData } from 'ngx-papaparse/lib/interfaces/unparse-data';
import { CatFileInterface } from '../file/cat-file.interface';
import { CatFileService } from '../file/cat-file.service';

@Injectable({ providedIn: 'any' })
export class CatCsvService {
  constructor(private papa: Papa, private fileService: CatFileService) {}

  public convertCsvToJson(file: CatFileInterface) {
    const csvContent = this.fileService.getContentOnFile(file);
    return this.papa.parse(csvContent, {
      header: true,
      delimiter: ';',
      newline: '\r\n',
      skipEmptyLines: true,
    }).data;
  }

  public convertJsonToCsv(json: UnparseData, filename = 'export') {
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
          type: 'text/csv;charset=utf8;',
        }
      ),
      filename
    );
  }

  private downloadCsv(blob: Blob, filename = 'export') {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
