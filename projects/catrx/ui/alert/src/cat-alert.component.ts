import { Component, Inject, signal } from '@angular/core';
import { CatDialogRef, CAT_DIALOG_DATA, CatDialogComponent } from '@catrx/ui/dialog';
import { CatAlertConfig } from './cat-alert.service';
import { CommonModule } from '@angular/common';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { CatButtonModule } from '@catrx/ui/button/cat-button.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CatDialogComponent,
    CatDynamicComponentModule,
    CatButtonModule,
  ],
  template: `
    <cat-dialog>
      <div class="cat-alert-content" [ngClass]="config.type" content>
        <cat-dynamic-component
          *ngIf="config.icon; else defaultIcon"
          [component]="config.icon"
        />
        <p [innerHTML]="config.message"></p>
      </div>
      <div class="cat-alert-actions" actions>
        <button catButton="primary" (click)="dialogRef.close()">Ok</button>
      </div>
    </cat-dialog>

    <ng-template #defaultIcon>
      <i [ngClass]="icon()"></i>
    </ng-template>`,
})
export class CatAlertComponent {
  icon = signal(this.getIcon())

  constructor(
    public dialogRef: CatDialogRef,
    @Inject(CAT_DIALOG_DATA) public config: CatAlertConfig
  ) { }

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
