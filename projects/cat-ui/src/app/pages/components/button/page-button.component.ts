import { CatComponentBase } from "@catrx/ui/common";
import { Component } from '@angular/core';

@Component({
  templateUrl: './page-button.component.html',
  styles: [
    `
      .buttons-content {
        padding: 15px;
      }
      h2 {
        padding: 10px 0;
      }
    `,
  ],
})
export class PageButtonComponent extends CatComponentBase {}
