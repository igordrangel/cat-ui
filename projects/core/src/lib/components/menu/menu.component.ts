import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { koala } from '@koalarx/utils';
import { AppConfigMenu, AppConfigMenuTool } from '../../factory/app-config.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cat-menu[config]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnChanges {
  @Input() config: AppConfigMenu;

  public menuOptions$ = new BehaviorSubject<AppConfigMenu | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.buildMenu();
    }
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
}
