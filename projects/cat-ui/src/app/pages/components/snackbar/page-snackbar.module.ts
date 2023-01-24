import { NgModule } from '@angular/core';
import {
  CatDangerButtonComponent,
  CatInfoButtonComponent,
  CatSuccessButtonComponent,
  CatWarningButtonComponent,
} from '@catrx/ui/button';
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
