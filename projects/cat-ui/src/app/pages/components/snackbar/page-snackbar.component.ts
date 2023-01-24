import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatSnackbarService, CatSnackbarType } from '@catrx/ui/snackbar';

@Component({
  templateUrl: './page-snackbar.component.html',
})
export class PageSnackbarComponent extends CatComponentBase {
  constructor(private snackbarService: CatSnackbarService) {
    super();
  }

  openSnackbar(type: CatSnackbarType) {
    this.snackbarService.open({
      type,
      title: 'Título do Snackbar',
      message: `Mensagem do <b>Snackbar</b>`,
      openedTime: 10000,
    });
  }
}
