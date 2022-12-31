import { Component } from '@angular/core';
import { CatConfirmService } from '@catrx/ui/confirm';
import { CatComponentBase } from '@catrx/ui/core';

@Component({
  templateUrl: './page-confirm.component.html'
})
export class PageConfirmComponent extends CatComponentBase {
  constructor(private confirmService: CatConfirmService) {
    super();
  }

  public ask() {
    this.confirmService.ask(
      'Você deseja mesmo continuar?',
      () => alert('Clicou em Sim'),
      {noCb: () => alert('Clicou em Não')}
    );
  }
}
