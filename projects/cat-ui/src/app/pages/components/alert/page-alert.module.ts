import { NgModule } from '@angular/core';
import { CatAlertModule } from '@catrx/ui/alert';
import {
  CatSuccessButtonComponent,
  CatWarningButtonComponent,
  CatDangerButtonComponent,
  CatInfoButtonComponent,
} from '@catrx/ui/button';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageAlertComponent } from './page-alert.component';
import { PageAlertRoutingModule } from './page-alert.routing.module';

@NgModule({
  declarations: [PageAlertComponent],
  imports: [
    CatToolbarModule,
    CatSuccessButtonComponent,
    CatWarningButtonComponent,
    CatDangerButtonComponent,
    CatInfoButtonComponent,
    CatAlertModule,
    PageAlertRoutingModule,
  ],
})
export class PageAlertModule {}
