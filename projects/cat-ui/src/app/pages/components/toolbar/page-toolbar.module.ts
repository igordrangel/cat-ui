import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageToolbarComponent } from './page-toolbar.component';
import { PageToolbarRoutingModule } from './page.toolbar.routing.module';

@NgModule({
  declarations: [PageToolbarComponent],
  imports: [CommonModule, CatToolbarModule, PageToolbarRoutingModule],
})
export class PageToolbarModule {}
