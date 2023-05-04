import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatDialogService } from '@catrx/ui/dialog';
import { DialogExampleComponent } from './dialog-example.component';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CatToolbarModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <button (click)="open()" class="btn btn-primary btn-sm">
          Abrir Dialog
        </button>
      </nav>
    </cat-toolbar>
  `,
})
export class PageDialogComponent extends CatComponentBase {
  constructor(private dialogService: CatDialogService) {
    super();
  }

  public open() {
    this.dialogService.open(DialogExampleComponent, {
      size: 'small',
      closeTrigger: 'showAlert',
      callbackCloseTrigger() {
        alert('Callback ao fechar.');
      },
    });
  }
}
