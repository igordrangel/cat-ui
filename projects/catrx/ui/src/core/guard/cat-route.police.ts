export class CatRoutePolice {
  static enableRoutes: string[] = [];
  static police?: (routePath: string) => boolean;

  static hasPermission(routePath: string) {
    if (this.enableRoutes.find((route) => route === routePath)) {
      return true;
    } else if (CatRoutePolice.police) {
      return CatRoutePolice.police(routePath);
    }

    return false;
  }
}
