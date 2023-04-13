import {
  AppConfigMenuModule,
  AppConfigMenuTool,
} from './../../../../factory/app-config.interface';
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'cat-menu-module[modules][menuCollapsed]',
  templateUrl: './module.component.html',
})
export class ModuleComponent {
  @Input() modules: AppConfigMenuModule[];
  @Input() menuCollapsed: BehaviorSubject<boolean>;

  isActive(module: AppConfigMenuModule) {
    const pathname = location.hash
      ? location.hash.replace('/#/', '')
      : location.pathname;
    if (pathname.includes(module.routerLink)) {
      return true;
    } else if (module.tools?.length > 0) {
      return this.hasActiveTool(module.tools);
    }
  }

  closeAllModules() {
    const modules = document.querySelectorAll('cat-menu .module.collapsed');
    modules.forEach((module) => module.classList.remove('collapsed'));
  }

  private hasActiveTool(tools: AppConfigMenuTool[]) {
    return !!tools.find((tool) => {
      const pathname = location.hash
        ? location.hash.replace('/#/', '')
        : location.pathname;
      if (pathname.includes(tool.routerLink)) {
        return true;
      } else if (tool.tools?.length > 0) {
        return this.hasActiveTool(tool.tools);
      } else {
        return false;
      }
    });
  }
}
