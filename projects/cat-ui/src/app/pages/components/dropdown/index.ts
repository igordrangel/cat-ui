import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CatPrimaryButtonComponent } from '@catrx/ui/button/primary';
import { CatComponentBase } from '@catrx/ui/common';
import { CatDropdownModule } from '@catrx/ui/dropdown';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CatToolbarModule,
    CatPrimaryButtonComponent,
    CatDropdownModule,
  ],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <cat-dropdown position="left">
          <cat-primary-button trigger>Left</cat-primary-button>
          <div content>
            <a class="dropdown-item">Ok</a>
          </div>
        </cat-dropdown>

        <cat-dropdown position="right">
          <cat-primary-button trigger>Right</cat-primary-button>
          <div content>
            <a class="dropdown-item">Ok</a>
          </div>
        </cat-dropdown>

        <cat-dropdown position="top">
          <cat-primary-button trigger>Top</cat-primary-button>
          <div content>
            <a class="dropdown-item">Ok</a>
          </div>
        </cat-dropdown>

        <cat-dropdown position="bottom">
          <cat-primary-button trigger>Bottom</cat-primary-button>
          <div content>
            <a class="dropdown-item">Ok</a>
          </div>
        </cat-dropdown>
      </nav>
    </cat-toolbar>
  `,
})
export class PageDropdownComponent extends CatComponentBase {}
