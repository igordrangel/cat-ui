import { Component } from '@angular/core';
import { CatButtonModule } from '@catrx/ui/button';
import { CatComponentBase } from '@catrx/ui/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatXlsxService } from '@catrx/ui/utils/xlsx';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatButtonModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <button catButton="primary" (click)="generateXLSXFile()">
          Gerar Arquivo .xlsx
        </button>
      </nav>
    </cat-toolbar>
  `,
})
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
