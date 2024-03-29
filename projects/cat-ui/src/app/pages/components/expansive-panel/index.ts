import { CatComponentBase } from '@catrx/ui/common';
import { Component } from '@angular/core';
import { CatExpansivePanelModule } from '@catrx/ui/expansive-panel';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatExpansivePanelModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()"></cat-toolbar>

    <h2 class="mt-20">Simples</h2>

    <cat-expansive-panel-group>
      <cat-expansive-panel>
        <div title>Panel 1</div>
        <div description>Descrição do Painel 1</div>

        Conteúdo do Painel 1
      </cat-expansive-panel>

      <cat-expansive-panel>
        <div title>Panel 2</div>
        <div description>Descrição do Painel 2</div>

        Conteúdo do Painel 2
      </cat-expansive-panel>

      <cat-expansive-panel [disabled]="true" [expanded]="true">
        <div title>Panel 3</div>
        <div description>Descrição do Painel 3</div>

        Conteúdo do Painel 3
      </cat-expansive-panel>

      <cat-expansive-panel>
        <div title>Panel 4</div>
        <div description>Descrição do Painel 4</div>

        Conteúdo do Painel 4
      </cat-expansive-panel>
    </cat-expansive-panel-group>

    <h2>Multiplo</h2>

    <cat-expansive-panel-group [multi]="true">
      <cat-expansive-panel>
        <div title>Panel 1</div>
        <div description>Descrição do Painel 1</div>

        Conteúdo do Painel 1
      </cat-expansive-panel>

      <cat-expansive-panel>
        <div title>Panel 2</div>
        <div description>Descrição do Painel 2</div>

        Conteúdo do Painel 2
      </cat-expansive-panel>
    </cat-expansive-panel-group>
  `,
  styles: [
    'cat-expansive-panel-group { display: block; padding: 20px; box-sizing: border-box; }',
    'h2 { padding: 0 20px; } ',
  ],
})
export class PageExpansivePanelComponent extends CatComponentBase {}
