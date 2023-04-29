import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageOnDemandFilterComponent } from "./page-on-demand-filter.component";

const routes: Routes = [
  { path: '', component: PageOnDemandFilterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageOnDemandFilterRoutingModule { }