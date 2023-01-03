import { Directive } from "@angular/core";
import { CatMenuContext } from "../cat-menu-context";

@Directive()
export abstract class CatComponentBase {
  public getToolbarInfo() {
    return CatMenuContext.context;
  }
}
