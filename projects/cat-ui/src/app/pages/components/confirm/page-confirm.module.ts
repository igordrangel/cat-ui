import { NgModule } from '@angular/core';
import { CatConfirmModule } from '@catrx/ui/confirm';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageConfirmComponent } from './page-confirm.component';
import { PageConfirmRoutingModule } from './page-confirm.routing.module';

@NgModule({
  declarations: [PageConfirmComponent],
  imports: [CatToolbarModule, CatConfirmModule, PageConfirmRoutingModule],
})
export class PageConfirmModule {}
