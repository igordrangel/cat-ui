import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { koala } from '@koalarx/utils';
import { AppConfigMenu, AppConfigMenuModule, AppConfigMenuTool } from '../../factory/app-config.interface';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { CatToolbarBreadcrumb } from '@catrx/ui/toolbar';
import { CatMenuContext } from '@catrx/ui/common';

@Component({
  selector: 'cat-menu[appName][config][menuCollapsed]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() appName: string;
  @Input() config: AppConfigMenu;
  @Input() menuCollapsed: BehaviorSubject<boolean>;

  public menuOptions$ = new BehaviorSubject<AppConfigMenu | null>(null);

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const activeModule = this.getActiveModule();
        const activeTool = this.getActiveTool();
        this.setInContext(activeTool, activeModule);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.buildMenu();
    }
  }

  public setInContext(
    toolOption?: AppConfigMenuTool,
    moduleOption?: AppConfigMenuModule
  ) {
    let breadcrumb: CatToolbarBreadcrumb[];

    if (moduleOption && toolOption) {
      breadcrumb = [
        { name: moduleOption.name, routerLink: moduleOption.routerLink },
        { name: toolOption.name, routerLink: toolOption.routerLink },
      ];
    } else if (moduleOption && !toolOption) {
      breadcrumb = [
        { name: moduleOption.name, routerLink: moduleOption.routerLink },
      ];
    } else {
      breadcrumb = [
        { name: toolOption.name, routerLink: toolOption.routerLink },
      ];
    }

    if (
      this.router.url !== moduleOption?.routerLink &&
      this.router.url !== toolOption?.routerLink
    ) {
      breadcrumb = koala(breadcrumb)
        .array<CatToolbarBreadcrumb>()
        .pipe((klArray) => {
          let pathRoute = '';
          return klArray
            .merge(
              koala(this.router.url)
                .string()
                .split('/')
                .clearEmptyValues()
                .map<CatToolbarBreadcrumb>((toolName) => {
                  pathRoute += `/${toolName}`;
                  if (toolOption.routerLink.indexOf(pathRoute) < 0) {
                    const toolByPath = this.getToolByPath(
                      toolOption,
                      pathRoute
                    );
                    if (toolByPath) {
                      return {
                        name: toolByPath.name,
                        routerLink: toolByPath.routerLink,
                      };
                    }
                    return { name: toolName };
                  }
                  return null;
                })
                .clearEmptyValues()
                .getValue()
            )
            .getValue();
        })
        .getValue();
    }

    let title: string;
    if (moduleOption && toolOption) {
      title = `${moduleOption.name} | ${toolOption.name}`;
    } else if (moduleOption && !toolOption) {
      title = moduleOption.name;
    } else {
      title = toolOption.name;
    }

    CatMenuContext.context = {
      icon: moduleOption?.icon ?? toolOption?.icon,
      title,
      breadcrumb,
    };

    document.title = `${title} | ${this.appName}`;
  }

  private buildMenu() {
    if (this.config?.modules?.length > 0)
      this.config.modules = koala(this.config.modules)
        .array<AppConfigMenuModule>()
        .map((module) => {
          if (module.hasPermission && !module.hasPermission()) {
            return null;
          }
          if (module.tools?.length > 0) {
            module.tools = this.getTools(module.tools);
          }
          return module;
        })
        .clearEmptyValues()
        .getValue();

    if (this.config?.tools?.length > 0)
      this.config.tools = this.getTools(this.config.tools);

    this.menuOptions$.next(this.config);
  }

  private getTools(tools: AppConfigMenuTool[]) {
    return koala(tools)
      .array<AppConfigMenuTool>()
      .map((tool) => {
        if (tool.hasPermission && !tool.hasPermission()) {
          return null;
        }
        return tool;
      })
      .clearEmptyValues()
      .getValue();
  }

  private getActiveModule() {
    return (
      this.config.modules?.find((module) => {
        if (module.routerLink?.indexOf(this.router.url) >= 0) {
          return module;
        }

        return module.tools?.find(
          (tool) => this.router.url.indexOf(tool.routerLink) >= 0
        );
      }) ?? null
    );
  }

  private getActiveTool() {
    const activeModule = this.getActiveModule();

    if (activeModule) {
      return (
        activeModule.tools?.find(
          (tool) => this.router.url.indexOf(tool.routerLink) >= 0
        ) ?? null
      );
    }

    return (
      this.config.tools?.find(
        (tool) => this.router.url.indexOf(tool.routerLink) >= 0
      ) ?? null
    );
  }

  private getToolByPath(
    toolConfig: AppConfigMenuTool,
    path: string
  ): AppConfigMenuTool | null {
    if (toolConfig.routerLink === path) {
      return toolConfig;
    } else {
      return toolConfig.tools?.find((tool) => {
        if (tool.routerLink === path) {
          return tool;
        } else if (tool.tools?.length > 0) {
          return tool.tools.find((subTool) =>
            this.getToolByPath(subTool, path)
          );
        } else {
          return null;
        }
      });
    }
  }
}
