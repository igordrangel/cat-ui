import { Directive } from "@angular/core";
import { CatMenuContext } from "../components/menu/cat-menu-context";

@Directive()
export abstract class CatBaseComponent {
  public getToolbarInfo() {
    return CatMenuContext.context;
  }
}
