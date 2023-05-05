import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CatButtonModule } from '@catrx/ui/button';
import { CatComponentBase } from '@catrx/ui/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatTooltipModule } from '@catrx/ui/tooltip';

@Component({
  standalone: true,
  imports: [CommonModule, CatToolbarModule, CatButtonModule, CatTooltipModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <button catButton="primary" catTooltip="left" catTooltipPosition="left">
          Left
        </button>

        <button
          catButton="primary"
          catTooltip="right"
          catTooltipPosition="right"
        >
          Right
        </button>

        <button
          catButton="primary"
          catTooltip="above"
          catTooltipPosition="above"
        >
          Above
        </button>

        <button
          catButton="primary"
          catTooltip="below"
          catTooltipPosition="below"
        >
          Below
        </button>
      </nav>
    </cat-toolbar>
  `,
})
export class PageTooltipComponent extends CatComponentBase {}
