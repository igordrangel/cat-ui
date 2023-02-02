import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatCsvService } from '@catrx/ui/utils/csv';

@Component({ templateUrl: './page-csv.component.html' })
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
