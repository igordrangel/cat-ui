import { InjectionToken, Injectable, Inject } from '@angular/core';
import { CatSideWindowConfig } from './cat-side-window.service';

export const CAT_SIDE_WINDOW_CONFIG = new InjectionToken('CatSideWindowConfig');
export const CAT_SIDE_WINDOW_REF_TOKEN = new InjectionToken('CatSideWindowRefToken');

@Injectable()
export class CatSideWindowRef<SideWindowRef> {
  constructor(
    @Inject(CAT_SIDE_WINDOW_CONFIG) private config: CatSideWindowConfig,
    @Inject(CAT_SIDE_WINDOW_REF_TOKEN) private elementId: string
  ) {}

  close() {
    const elDialog = document.getElementById(this.elementId);
    if (elDialog) {
      const elSideWindowContent = document.querySelector(
        `#${this.elementId} .cat-side-window-content`
      );
      elSideWindowContent?.classList.add('animate__animated');
      elSideWindowContent?.classList.add('animate__slideOutRight');
      setTimeout(() => elDialog.remove(), 200);

      if (this.config.onClose)
        this.config.onClose();
    }
  }
}
