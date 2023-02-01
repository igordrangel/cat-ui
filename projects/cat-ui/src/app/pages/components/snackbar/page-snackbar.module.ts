import { NgModule } from '@angular/core';
import { CatDangerButtonComponent } from '@catrx/ui/button/src/lib/components/danger';
import { CatInfoButtonComponent } from '@catrx/ui/button/src/lib/components/info';
import { CatSuccessButtonComponent } from '@catrx/ui/button/src/lib/components/success';
import { CatWarningButtonComponent } from '@catrx/ui/button/src/lib/components/warning';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageSnackbarComponent } from './page-snackbar.component';
import { PageSnackbarRoutingModule } from './page-snackbar.routing.module';

@NgModule({
  declarations: [PageSnackbarComponent],
  imports: [
    CatToolbarModule,
    CatSuccessButtonComponent,
    CatWarningButtonComponent,
    CatDangerButtonComponent,
    CatInfoButtonComponent,
    PageSnackbarRoutingModule,
  ],
})
export class PageSnackbarModule {}
