import { NgModule } from "@angular/core";
import {
  CatPrimaryButtonComponent,
  CatSecondaryButtonComponent,
  CatSuccessButtonComponent,
  CatWarningButtonComponent,
  CatDangerButtonComponent,
  CatInfoButtonComponent,
} from '@catrx/ui/button';
import { CatToolbarModule } from "@catrx/ui/toolbar";
import { PageButtonComponent } from "./page-button.component";
import { PageButtonRoutingModule } from "./page-button.routing.module";

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
