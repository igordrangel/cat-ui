import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CatButtonModule } from '@catrx/ui/button';
import { CatComponentBase } from '@catrx/ui/common';
import { CatDropdownModule } from '@catrx/ui/dropdown';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CommonModule, CatToolbarModule, CatButtonModule, CatDropdownModule],
  styleUrls: ['./styles.css'],
  template: `
    <cat-toolbar [config]="getToolbarInfo()"></cat-toolbar>
    <div class="content">
      <h4>Left</h4>
      <cat-dropdown position="left">
        <button catButton="primary" trigger>position="left"</button>
        <div content>
          <a class="dropdown-item">Ok</a>
        </div>
      </cat-dropdown>

      <h4>Right</h4>
      <cat-dropdown position="right">
        <button catButton="primary" trigger>position="right"</button>
        <div content>
          <a class="dropdown-item">Ok</a>
        </div>
      </cat-dropdown>

      <h4>Top</h4>
      <cat-dropdown position="top">
        <button catButton="primary" trigger>position="top"</button>
        <div content>
          <a class="dropdown-item">Ok</a>
        </div>
      </cat-dropdown>

      <h4>Bottom</h4>
      <cat-dropdown position="bottom">
        <button catButton="primary" trigger>position="bottom"</button>
        <div content>
          <a class="dropdown-item">Ok</a>
        </div>
      </cat-dropdown>
    </div>
  `,
})
export class PageDropdownComponent extends CatComponentBase {}
