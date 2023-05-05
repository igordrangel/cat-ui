import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatSideWindowService } from '@catrx/ui/side-window';
import { SideWindowExampleComponent } from './side-window-example.compoent';
import { CommonModule } from '@angular/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CommonModule, CatToolbarModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <button (click)="open()" class="btn btn-primary btn-sm">
          Abrir Janela Lateral
        </button>
      </nav>
    </cat-toolbar>
  `,
})
export class PageSideWindowComponent extends CatComponentBase {
  constructor(private sideWindowService: CatSideWindowService) {
    super();
  }

  public open() {
    this.sideWindowService.open(SideWindowExampleComponent, {
      data: 'Olá Mundo',
      onClose: () => alert('Fechou a Janela Lateral.'),
    });
  }
}
