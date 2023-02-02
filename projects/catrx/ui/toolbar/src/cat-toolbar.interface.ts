export interface CatToolbarConfig {
  icon?: string;
  title: string;
  breadcrumb: CatToolbarBreadcrumb[];
}

export interface CatToolbarBreadcrumb {
  name: string;
  routerLink?: string;
}
