import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageSideWindowComponent } from './page-side-window.component';
import { SideWindowExampleComponent } from './side-window-example.compoent';
import { PageSideWindowRoutingModule } from './page-side-window.routing.module';

@NgModule({
  declarations: [PageSideWindowComponent, SideWindowExampleComponent],
  imports: [
    CommonModule,
    CatToolbarModule,
    PageSideWindowRoutingModule
  ],
})
export class PageSideWindowModule {}
