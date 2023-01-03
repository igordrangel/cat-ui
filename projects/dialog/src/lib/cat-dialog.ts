import { InjectionToken, Injectable, Inject } from "@angular/core";
import { CatDialogOptions } from "./cat-dialog.interface";

export const CAT_DIALOG_DATA = new InjectionToken('CatDialogData');
export const CAT_DIALOG_OPTIONS = new InjectionToken('CatDialogOptions');
export const CAT_DIALOG_REF_TOKEN = new InjectionToken('CatDialogRefToken');

@Injectable()
export class CatDialogRef<DialogRef> {
  constructor(
    @Inject(CAT_DIALOG_OPTIONS) private options: CatDialogOptions,
    @Inject(CAT_DIALOG_REF_TOKEN) private elementId: string
  ) {}

  close(value?: any) {
    const elDialog = document.getElementById(this.elementId);
    if (elDialog) {
      const elDialogBackdrop = document.querySelector(
        `#${this.elementId} .cat-dialog`
      );
      elDialogBackdrop?.classList.add('animate__animated');
      elDialogBackdrop?.classList.add('animate__fadeOut');

      const elDialogContent = document.querySelector(
        `#${this.elementId} .cat-dialog-content`
      );
      elDialogContent?.classList.add('animate__animated');
      elDialogContent?.classList.add('animate__zoomOut');
      setTimeout(() => elDialog.remove(), 200);

      if (
        this.options?.closeTrigger === value ||
        (typeof this.options?.closeTrigger === 'object' &&
          typeof value === 'object')
      ) {
        if (this.options.callbackCloseTrigger)
          this.options.callbackCloseTrigger(value);
      }
    }
  }
}
