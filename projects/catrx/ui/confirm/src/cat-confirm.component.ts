import { Component, Inject } from '@angular/core';
import {
  CatDialogRef,
  CAT_DIALOG_DATA,
  CatDialogComponent,
} from '@catrx/ui/dialog';
import {
  ConfirmData,
  ConfirmType,
  ConfirmResponse,
} from './cat-confirm.interface';
import { CommonModule } from '@angular/common';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';

@Component({
  standalone: true,
  imports: [CommonModule, CatDialogComponent, CatDynamicComponentModule],
  template: `
    <cat-dialog>
      <div class="cat-confirm-content" content>
        <cat-dynamic-component
          *ngIf="options.icon; else defaultIcon"
          [component]="options.icon"
        />
        <p [innerHTML]="options.question" class="text-center"></p>
      </div>
      <div class="cat-confirm-actions" actions>
        <button (click)="answer('yes')" class="btn btn-success btn-sm">
          Sim
        </button>
        <span class="divide-buttons">ou</span>
        <button (click)="answer('no')" class="btn btn-danger btn-sm">
          Não
        </button>
      </div>
    </cat-dialog>

    <ng-template #defaultIcon>
      <i class="fa-solid fa-circle-question"></i>
    </ng-template>
  `,
})
export class CatConfirmComponent {
  constructor(
    private dialogRef: CatDialogRef,
    @Inject(CAT_DIALOG_DATA) public options: ConfirmData
  ) {}

  public answer(answer: ConfirmType) {
    this.dialogRef.close({ answer } as ConfirmResponse);
  }
}
