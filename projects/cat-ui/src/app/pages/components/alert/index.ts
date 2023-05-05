import { Component } from '@angular/core';
import {
  CatAlertComponent,
  CatAlertService,
  CatAlertType,
} from '@catrx/ui/alert';
import { CatButtonModule } from '@catrx/ui/button/cat-button.module';
import { CatComponentBase } from '@catrx/ui/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatButtonModule, CatAlertComponent],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <button catButton="success" (click)="openAlert('success')">
          Sucesso
        </button>

        <button catButton="warning" (click)="openAlert('warning')">
          Atenção
        </button>

        <button catButton="danger" (click)="openAlert('error')">Error</button>

        <button catButton="info" (click)="openAlert('info')">Informação</button>
      </nav>
    </cat-toolbar>
  `,
})
export class PageAlertComponent extends CatComponentBase {
  constructor(private alertService: CatAlertService) {
    super();
  }

  openAlert(type: CatAlertType) {
    this.alertService.show({
      type,
      message: `Alerta de Tipo: <b>${type}</b>`,
    });
  }
}
