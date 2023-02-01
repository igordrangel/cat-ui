import { NgModule } from '@angular/core';
import { CatAlertModule } from '@catrx/ui/alert';
import { CatDangerButtonComponent } from '@catrx/ui/button/src/lib/components/danger';
import { CatInfoButtonComponent } from '@catrx/ui/button/src/lib/components/info';
import { CatSuccessButtonComponent } from '@catrx/ui/button/src/lib/components/success';
import { CatWarningButtonComponent } from '@catrx/ui/button/src/lib/components/warning';
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
