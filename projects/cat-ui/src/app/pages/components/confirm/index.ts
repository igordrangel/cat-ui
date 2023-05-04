import { Component } from '@angular/core';
import { CatConfirmComponent, CatConfirmService } from '@catrx/ui/confirm';
import { CatComponentBase } from '@catrx/ui/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatConfirmComponent],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <button (click)="ask()" type="button" class="btn btn-primary btn-sm">
          Confirmar
        </button>
      </nav>
    </cat-toolbar>
  `,
})
export class PageConfirmComponent extends CatComponentBase {
  constructor(private confirmService: CatConfirmService) {
    super();
  }

  public ask() {
    this.confirmService.ask(
      'Você deseja mesmo continuar?',
      () => alert('Clicou em Sim'),
      { noCb: () => alert('Clicou em Não') }
    );
  }
}
