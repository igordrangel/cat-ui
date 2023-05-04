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
  styleUrls: ['./styles.css'],
  template: `
    <cat-toolbar [config]="getToolbarInfo()"></cat-toolbar>
    <div class="content">
      <h4>Left</h4>
      <cat-dropdown position="left">
        <cat-primary-button trigger>position="left"</cat-primary-button>
        <div content>
          <a class="dropdown-item">Ok</a>
        </div>
      </cat-dropdown>

      <h4>Right</h4>
      <cat-dropdown position="right">
        <cat-primary-button trigger>position="right"</cat-primary-button>
        <div content>
          <a class="dropdown-item">Ok</a>
        </div>
      </cat-dropdown>

      <h4>Top</h4>
      <cat-dropdown position="top">
        <cat-primary-button trigger>position="top"</cat-primary-button>
        <div content>
          <a class="dropdown-item">Ok</a>
        </div>
      </cat-dropdown>

      <h4>Bottom</h4>
      <cat-dropdown position="bottom">
        <cat-primary-button trigger>position="bottom"</cat-primary-button>
        <div content>
          <a class="dropdown-item">Ok</a>
        </div>
      </cat-dropdown>
    </div>
  `,
})
export class PageDropdownComponent extends CatComponentBase {}
