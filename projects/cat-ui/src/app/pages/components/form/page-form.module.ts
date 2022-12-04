import { NgModule } from "@angular/core";
import { PageFormComponent } from "./page-form.component";
import { CatFormModule } from "@cat-ui/form";
import { PageFormRoutingModule } from "./page-form.routing.module";

@NgModule({
  declarations: [PageFormComponent],
  imports: [
    CatFormModule,
    PageFormRoutingModule
  ]
})
export class PageFormModule {}
