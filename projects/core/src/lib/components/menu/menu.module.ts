import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { ToolComponent } from './components/tool/tool.component';
import { ModuleComponent } from './components/module/module.component';
import { CatDropdownModule } from '@catrx/ui/dropdown';
import { CatTooltipModule } from '@catrx/ui/tooltip';

@NgModule({
  declarations: [MenuComponent, ModuleComponent, ToolComponent],
  exports: [MenuComponent],
  imports: [CommonModule, RouterModule, CatDropdownModule, CatTooltipModule],
})
export class MenuModule {}
