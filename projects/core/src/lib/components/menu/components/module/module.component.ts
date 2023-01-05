import { AppConfigMenuModule, AppConfigMenuTool } from './../../../../factory/app-config.interface';
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'cat-menu-module[modules][menuCollapsed]',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
})
export class ModuleComponent {
  @Input() modules: AppConfigMenuModule[];
  @Input() menuCollapsed: BehaviorSubject<boolean>;

  isActive(module: AppConfigMenuModule) {
    if (module.routerLink === location.pathname) {
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
      if (tool.routerLink === location.pathname) {
        return true;
      } else if (tool.tools?.length > 0) {
        return this.hasActiveTool(tool.tools);
      } else {
        return false;
      }
    });
  }
}
