import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageToolbarComponent } from './page-toolbar.component';
import { PageToolbarRoutingModule } from './page.toolbar.routing.module';
import { CatDefaultButtonComponent } from '@catrx/ui/button/default';

@NgModule({
  declarations: [PageToolbarComponent],
  imports: [CommonModule, CatToolbarModule, CatDefaultButtonComponent, PageToolbarRoutingModule],
})
export class PageToolbarModule { }
