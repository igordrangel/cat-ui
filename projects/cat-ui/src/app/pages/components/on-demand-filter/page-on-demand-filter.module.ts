import { NgModule } from "@angular/core";
import { PageOnDemandFilterComponent } from "./page-on-demand-filter.component";
import { CommonModule } from "@angular/common";
import { CatToolbarModule } from "@catrx/ui/toolbar";
import { PageOnDemandFilterRoutingModule } from "./page-on-demand-filter.routing.module";
import { CatOnDemandFilterModule } from "@catrx/ui/on-demand-filter";

@NgModule({
  declarations: [PageOnDemandFilterComponent],
  imports: [
    CommonModule,
    CatToolbarModule,
    CatOnDemandFilterModule,
    PageOnDemandFilterRoutingModule
  ]
})
export class PageOnDemandFilterModule { }