import { CatToolbarConfig, CatToolbarBreadcrumb } from './cat-toolbar.interface';

export class ToolbarFactory {
  private config: CatToolbarConfig;

  constructor(title: string, breadcrumb: CatToolbarBreadcrumb[]) {
    this.config = {
      title,
      breadcrumb,
    };
  }

  public setIcon(icon: string) {
    this.config.icon = icon;
    return this;
  }

  public setBreadcrumb(breadcrumb: CatToolbarBreadcrumb[]) {
    this.config.breadcrumb = breadcrumb;
    return this;
  }

  public generate() {
    return this.config;
  }
}
