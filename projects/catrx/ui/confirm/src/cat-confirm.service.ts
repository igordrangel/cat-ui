import { Injectable } from '@angular/core';
import { CatDialogService } from '@catrx/ui/dialog';
import { ConfirmOptions, ConfirmResponse } from './cat-confirm.interface';
import { CatConfirmComponent } from './cat-confirm.component';

@Injectable({ providedIn: 'root' })
export class CatConfirmService {
  constructor(private dialogService: CatDialogService) {}

  public ask(question: string, yesCb: () => void, options?: ConfirmOptions) {
    this.dialogService.open(CatConfirmComponent, {
      size: 'small',
      data: { question, icon: options?.icon },
      closeTrigger: {},
      callbackCloseTrigger(value: ConfirmResponse) {
        if (value.answer === 'yes') {
          yesCb();
        } else if (options?.noCb) {
          options.noCb();
        }
      },
    });
  }
}
