import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { koala } from '@koalarx/utils';
import { AppConfigMenu, AppConfigMenuModule, AppConfigMenuTool } from '../../factory/app-config.interface';
import { BehaviorSubject } from 'rxjs';
import { CatMenuContext } from './cat-menu-context';
import { NavigationEnd, Router } from '@angular/router';
import { CatToolbarBreadcrumb } from '@catrx/ui/toolbar';

@Component({
  selector: 'cat-menu[config]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() config: AppConfigMenu;

  public menuOptions$ = new BehaviorSubject<AppConfigMenu | null>(null);

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setInContext(this.getActiveTool(), this.getActiveModule());
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.buildMenu();
    }
  }

  public setInContext(toolOption: AppConfigMenuTool, moduleOption?: AppConfigMenuModule) {
    let breadcrumb: CatToolbarBreadcrumb[];

    if (moduleOption) {
      breadcrumb = [
        { name: moduleOption.name },
        { name: toolOption.name, routerLink: toolOption.routerLink },
      ];
    } else {
      breadcrumb = [
        { name: toolOption.name, routerLink: toolOption.routerLink },
      ];
    }

    if (this.router.url !== toolOption.routerLink) {
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

    CatMenuContext.context = {
      icon: moduleOption?.icon ?? toolOption.icon,
      title: moduleOption?.name ?? toolOption.name,
      breadcrumb,
    };
  }

  private buildMenu() {
    if (this.config?.modules?.length > 0)
      this.config.modules = this.config.modules.map((module) => {
        module.tools = this.getTools(module.tools);
        return module;
      });

    if (this.config?.tools?.length > 0)
      this.config.tools = this.getTools(this.config.tools);

    this.menuOptions$.next(this.config);
  }

  private getTools(tools: AppConfigMenuTool[]) {
    return koala(tools)
      .array<AppConfigMenuTool>()
      .map((tool) => {
        if (!tool.hasPermission()) {
          return null;
        }
        return tool;
      })
      .clearEmptyValues()
      .getValue();
  }

  private getActiveModule() {
    return this.config.modules?.find((module) =>
      module.tools.find((tool) => this.router.url.indexOf(tool.routerLink) >= 0)
    ) ?? null;
  }

  private getActiveTool() {
    const activeModule = this.getActiveModule();

    if (activeModule) {
      return activeModule.tools?.find(
        (tool) => this.router.url.indexOf(tool.routerLink) >= 0
      ) ?? null;
    }

    return this.config.tools?.find(
      (tool) => this.router.url.indexOf(tool.routerLink) >= 0
    ) ?? null;
  }
}
