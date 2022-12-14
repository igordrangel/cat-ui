import { Component, Inject } from '@angular/core';
import { CatDialogRef, CAT_DIALOG_DATA } from '@catrx/ui/dialog';
import { ConfirmData, ConfirmType, ConfirmResponse } from './cat-confirm.interface';

@Component({
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent {
  constructor(
    private dialogRef: CatDialogRef<ConfirmComponent>,
    @Inject(CAT_DIALOG_DATA) public options: ConfirmData
  ) {}

  public answer(answer: ConfirmType) {
    this.dialogRef.close({ answer } as ConfirmResponse);
  }
}
