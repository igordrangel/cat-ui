import { Component, OnInit } from '@angular/core';
import { CatComponentBase, CatCsvService } from '@catrx/ui/core';

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
