import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { ToolComponent } from './components/tool/tool.component';
import { ModuleComponent } from './components/module/module.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [MenuComponent, ModuleComponent, ToolComponent],
  exports: [MenuComponent],
  imports: [CommonModule, RouterModule, BsDropdownModule.forRoot(), MatTooltipModule],
})
export class MenuModule {}
