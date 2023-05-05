import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatTabModule } from '@catrx/ui/tab';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatTabModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()"></cat-toolbar>

    <cat-tab-group>
      <cat-tab label="First">Content 1</cat-tab>
      <cat-tab label="Second">Content 2</cat-tab>
      <cat-tab label="Third">Content 3</cat-tab>
    </cat-tab-group>
  `,
})
export class PageTabComponent extends CatComponentBase {}
