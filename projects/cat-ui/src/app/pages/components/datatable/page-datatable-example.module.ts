import { NgModule } from "@angular/core";
import { PageDatatableExampleRoutingModule } from "./page-datatable-example.routing.module";
import { DatatableModule } from "../../../../../../datatable/src/lib/datatable.module";
import { PageDatatableExampleComponent } from "./page-datatable-example.component";

@NgModule({
  declarations: [PageDatatableExampleComponent],
  imports: [
    DatatableModule,
    PageDatatableExampleRoutingModule
  ]
})
export class PageDatatableExampleModule {}
