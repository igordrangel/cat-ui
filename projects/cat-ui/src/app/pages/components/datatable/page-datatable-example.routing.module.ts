import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PageDatatableExampleComponent } from "./page-datatable-example.component";
import { CatAuthGuard } from "@catrx/ui/core";

const routes: Routes = [
  {
    path: '',
    component: PageDatatableExampleComponent,
    canActivate: [CatAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageDatatableExampleRoutingModule {}
