import { NgModule } from '@angular/core';
import { CatTabModule } from '@catrx/ui/tab';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageTabComponent } from './page-tab.component';
import { PageTabRoutingModule } from './page-tab.routing.module';

@NgModule({
  declarations: [PageTabComponent],
  imports: [CatToolbarModule, CatTabModule, PageTabRoutingModule],
})
export class PageTabModule {}
