import { Component } from '@angular/core';
import { CatAlertService, CatAlertType } from '@catrx/ui/alert';
import { CatComponentBase } from '@catrx/ui/common';

@Component({
  templateUrl: './page-alert.component.html',
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
