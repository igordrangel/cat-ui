import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { ToolComponent } from './components/tool/tool.component';
import { ModuleComponent } from './components/module/module.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CatDropdownModule } from '@catrx/ui/dropdown';

@NgModule({
  declarations: [MenuComponent, ModuleComponent, ToolComponent],
  exports: [MenuComponent],
  imports: [CommonModule, RouterModule, CatDropdownModule, MatTooltipModule],
})
export class MenuModule {}
