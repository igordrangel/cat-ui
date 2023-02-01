import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatXlsxService } from '@catrx/ui/utils/src/lib/xlsx';

@Component({ templateUrl: './page.xlsx.component.html' })
export class PageXlsxComponent extends CatComponentBase {
  constructor(private xlsxService: CatXlsxService) {
    super();
  }

  public generateXLSXFile() {
    this.xlsxService.convertJsonToXlsx(
      [
        {
          sheetName: 'Felinos',
          json: [
            { name: 'Jimmy', lastname: 'Hendrix' },
            { name: 'Fred', lastname: 'Mercury' },
            { name: 'John', lastname: 'Snow' },
          ],
        },
        {
          sheetName: 'Cães',
          json: [
            { name: 'Jimmy', lastname: 'Hendrix' },
            { name: 'Fred', lastname: 'Mercury' },
            { name: 'John', lastname: 'Snow' },
          ],
        },
      ],
      'Lista de Pets'
    );
  }
}
