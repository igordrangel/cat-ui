import { Injectable } from "@angular/core";
import { CatToolbarBreadcrumb, CatToolbarConfig } from './cat-toolbar.interface';
import { ToolbarFactory } from "./toolbar.factory";

@Injectable()
export class CatToolbarService {
  private config: CatToolbarConfig;

  public build(moduleName: string, breadcrumb: CatToolbarBreadcrumb[]) {
    return new ToolbarFactory(moduleName, breadcrumb);
  }
}
