import { NgModule } from "@angular/core";
import { PageDatatableExampleRoutingModule } from "./page-datatable-example.routing.module";
import { PageDatatableExampleComponent } from "./page-datatable-example.component";
import { CatDatatableModule } from "@catrx/ui/datatable";

@NgModule({
  declarations: [PageDatatableExampleComponent],
  imports: [
    CatDatatableModule,
    PageDatatableExampleRoutingModule
  ]
})
export class PageDatatableExampleModule {}
