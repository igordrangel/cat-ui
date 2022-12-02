import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'components',
    children: [
      {path: 'datatable', loadChildren: () => import('./pages/components/datatable/page-datatable-example.module').then(m => m.PageDatatableExampleModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
