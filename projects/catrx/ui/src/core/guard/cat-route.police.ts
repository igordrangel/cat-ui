import { klDelay } from "@koalarx/utils/operators/delay";
import { CatLoggedUser } from "./cat-logged-user";

export class CatRoutePolice {
  static enableRoutes: string[] = [];
  static police?: (routePath: string) => boolean;

  static async hasPermission(routePath: string) {
    do {
      await klDelay(50);
    } while(!CatLoggedUser.claims);

    if (this.enableRoutes.find((route) => route === routePath)) {
      return true;
    } else if (CatRoutePolice.police) {
      return CatRoutePolice.police(routePath);
    }

    return false;
  }
}
