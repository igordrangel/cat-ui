import { CatComponentBase } from '@catrx/ui/common';
import { Component } from '@angular/core';

@Component({
  templateUrl: './page-expansive-panel.component.html',
  styles: [
    `
      cat-expansive-panel-group {
        display: block;
        padding: 20px;
        box-sizing: border-box;
      }
      h2 {
        padding: 0 20px;
      }
    `,
  ],
})
export class PageExpansivePanelComponent extends CatComponentBase {}
