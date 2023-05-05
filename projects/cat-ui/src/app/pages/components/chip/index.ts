import { Component } from '@angular/core';
import { CatChip, CatChipComponent } from '@catrx/ui/chip';
import { CatComponentBase } from '@catrx/ui/common';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatDynamicComponentModule, CatChipComponent],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <cat-chip color="success">Success</cat-chip>
        <cat-chip color="warning">Warning</cat-chip>
        <cat-chip color="danger">Danger</cat-chip>
        <cat-chip color="info">Info</cat-chip>
        <cat-chip color="primary">Primary</cat-chip>
        <cat-chip color="secondary">Secondary</cat-chip>
        <cat-dynamic-component [component]="chipWithDynamicComponent" />
      </nav>
    </cat-toolbar>
  `,
})
export class PageChipComponent extends CatComponentBase {
  chipWithDynamicComponent = new CatChip('Componente Dinâmico', 'success');
}
