import { CatComponentBase } from '@catrx/ui/common';
import { Component } from '@angular/core';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatButtonModule } from '@catrx/ui/button/cat-button.module';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatButtonModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()"></cat-toolbar>

    <div class="buttons-content">
      <h2>Botões Preenchidos</h2>

      <div class="btn-group-content">
        <button catButton="primary">Primary</button>
        <button catButton="default">Default</button>
        <button catButton="secondary">Secondary</button>
        <button catButton="success">Success</button>
        <button catButton="warning">Warning</button>
        <button catButton="danger">Danger</button>
        <button catButton="info">Info</button>
      </div>

      <h2>Botões em borda</h2>

      <div class="btn-group-content">
        <button catButton="primary" [outline]="true">Primary</button>
        <button catButton="default" [outline]="true">Default</button>
        <button catButton="secondary" [outline]="true">Secondary</button>
        <button catButton="success" [outline]="true">Success</button>
        <button catButton="warning" [outline]="true">Warning</button>
        <button catButton="danger" [outline]="true">Danger</button>
        <button catButton="info" [outline]="true">Info</button>
      </div>
    </div>
  `,
  styles: [
    '.buttons-content { padding: 15px; }',
    'h2 { padding: 10px 0; }',
    '.btn-group-content { display: flex;gap: 0.5rem; }',
  ],
})
export class PageButtonComponent extends CatComponentBase {}
