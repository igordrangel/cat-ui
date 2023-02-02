import { NgModule } from '@angular/core';
import { CatDangerButtonComponent } from '@catrx/ui/button/danger';
import { CatInfoButtonComponent } from '@catrx/ui/button/info';
import { CatSuccessButtonComponent } from '@catrx/ui/button/success';
import { CatWarningButtonComponent } from '@catrx/ui/button/warning';
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
