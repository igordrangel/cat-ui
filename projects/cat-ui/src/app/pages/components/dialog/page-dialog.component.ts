import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatDialogService } from '@catrx/ui/dialog';
import { DialogExampleComponent } from './dialog-example.component';

@Component({
  templateUrl: './page-dialog.component.html'
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
