import { Component } from '@angular/core';
import { CatButtonModule } from '@catrx/ui/button/cat-button.module';
import { CatComponentBase } from '@catrx/ui/common';
import { CatSnackbarService, CatSnackbarType } from '@catrx/ui/snackbar';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatButtonModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <button catButton="success" (click)="openSnackbar('success')">
          Sucesso
        </button>
        <button catButton="warning" (click)="openSnackbar('warning')">
          Atenção
        </button>
        <button catButton="danger" (click)="openSnackbar('error')">
          Error
        </button>
        <button catButton="info" (click)="openSnackbar('info')">
          Informação
        </button>
      </nav>
    </cat-toolbar>
  `,
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
