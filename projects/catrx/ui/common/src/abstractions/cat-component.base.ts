import { Directive } from '@angular/core';
import { CatMenuContext } from '../cat-menu-context';

@Directive()
export abstract class CatComponentBase {
  public getToolbarInfo(withoutTitle = false) {
    const context = Object.assign(CatMenuContext.context ?? {});

    if (withoutTitle) {
      delete context.title;
      delete context.icon;
    }

    return context;
  }
}
