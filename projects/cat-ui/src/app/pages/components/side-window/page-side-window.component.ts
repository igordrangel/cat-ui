import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatSideWindowService } from '@catrx/ui/side-window';
import { SideWindowExampleComponent } from './side-window-example.compoent';

@Component({
  templateUrl: './page-side-window.component.html',
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
