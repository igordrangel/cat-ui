import { NgModule } from "@angular/core";
import { PageDatatableExampleRoutingModule } from "./page-datatable-example.routing.module";
import { CatDatatableModule } from "../../../../../../datatable/src/lib/cat-datatable.module";
import { PageDatatableExampleComponent } from "./page-datatable-example.component";

@NgModule({
  declarations: [PageDatatableExampleComponent],
  imports: [
    CatDatatableModule,
    PageDatatableExampleRoutingModule
  ]
})
export class PageDatatableExampleModule {}
