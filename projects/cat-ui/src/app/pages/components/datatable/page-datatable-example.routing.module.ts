import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageDatatableExampleComponent } from './page-datatable-example.component';

const routes: Routes = [
  {
    path: ':uf',
    component: PageDatatableExampleComponent,
  },
  {
    path: '',
    component: PageDatatableExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDatatableExampleRoutingModule {}
