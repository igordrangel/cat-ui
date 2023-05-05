import { Component } from '@angular/core';
import { CatButtonModule } from '@catrx/ui/button';
import { CatComponentBase } from '@catrx/ui/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatCsvService } from '@catrx/ui/utils/csv';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatButtonModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <button catButton="primary" (click)="generateCsvFile()">
          Gerar Arquivo .csv
        </button>
      </nav>
    </cat-toolbar>
  `,
})
export class PageCsvComponent extends CatComponentBase {
  constructor(private csvService: CatCsvService) {
    super();
  }

  public generateCsvFile() {
    this.csvService.convertJsonToCsv([
      { name: 'Jimmy', lastname: 'Hendrix' },
      { name: 'Fred', lastname: 'Mercury' },
      { name: 'John', lastname: 'Snow' },
    ]);
  }
}
