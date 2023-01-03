import { Component, Inject } from '@angular/core';
import { CatDialogRef, CAT_DIALOG_DATA } from '@catrx/ui/dialog';
import { CatAlertConfig } from './cat-alert.service';

@Component({
  template: `<cat-dialog>
      <div class="cat-alert-content" [ngClass]="config.type" content>
        <cat-dynamic-component
          *ngIf="config.icon; else defaultIcon"
          [component]="config.icon"
        ></cat-dynamic-component>
        <p [innerHTML]="config.message"></p>
      </div>
      <div class="cat-alert-actions" actions>
        <cat-primary-button (click)="dialogRef.close()">Ok</cat-primary-button>
      </div>
    </cat-dialog>

    <ng-template #defaultIcon>
      <i [ngClass]="getIcon()"></i>
    </ng-template>`,
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  constructor(
    public dialogRef: CatDialogRef<AlertComponent>,
    @Inject(CAT_DIALOG_DATA) public config: CatAlertConfig
  ) {}

  getIcon() {
    switch (this.config.type) {
      case 'success':
        return 'fa-regular fa-circle-check';
      case 'warning':
        return 'fa-solid fa-triangle-exclamation';
      case 'error':
        return 'fa-regular fa-circle-xmark';
      case 'info':
        return 'fa-solid fa-circle-exclamation';
    }
  }
}
