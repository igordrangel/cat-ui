import { NgModule } from '@angular/core';
import { CatDangerButtonComponent } from '@catrx/ui/button/danger';
import { CatInfoButtonComponent } from '@catrx/ui/button/info';
import { CatPrimaryButtonComponent } from '@catrx/ui/button/primary';
import { CatSecondaryButtonComponent } from '@catrx/ui/button/secondary';
import { CatSuccessButtonComponent } from '@catrx/ui/button/success';
import { CatWarningButtonComponent } from '@catrx/ui/button/warning';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageButtonComponent } from './page-button.component';
import { PageButtonRoutingModule } from './page-button.routing.module';

@NgModule({
  declarations: [PageButtonComponent],
  imports: [
    CatToolbarModule,
    CatPrimaryButtonComponent,
    CatSecondaryButtonComponent,
    CatSuccessButtonComponent,
    CatWarningButtonComponent,
    CatDangerButtonComponent,
    CatInfoButtonComponent,
    PageButtonRoutingModule,
  ],
})
export class PageButtonModule {}
