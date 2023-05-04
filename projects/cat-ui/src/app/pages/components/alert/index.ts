import { Component } from '@angular/core';
import {
  CatAlertComponent,
  CatAlertService,
  CatAlertType,
} from '@catrx/ui/alert';
import { CatDangerButtonComponent } from '@catrx/ui/button/danger';
import { CatInfoButtonComponent } from '@catrx/ui/button/info';
import { CatSuccessButtonComponent } from '@catrx/ui/button/success';
import { CatWarningButtonComponent } from '@catrx/ui/button/warning';
import { CatComponentBase } from '@catrx/ui/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [
    CatToolbarModule,
    CatSuccessButtonComponent,
    CatWarningButtonComponent,
    CatDangerButtonComponent,
    CatInfoButtonComponent,
    CatAlertComponent,
  ],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <cat-success-button (click)="openAlert('success')">
          Sucesso
        </cat-success-button>

        <cat-warning-button (click)="openAlert('warning')">
          Atenção
        </cat-warning-button>

        <cat-danger-button (click)="openAlert('error')">
          Error
        </cat-danger-button>

        <cat-info-button (click)="openAlert('info')">
          Informação
        </cat-info-button>
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
