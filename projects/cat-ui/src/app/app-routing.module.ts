import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'components',
    children: [
      {path: 'datatable', loadChildren: () => import('./pages/components/datatable/page-datatable-example.module').then(m => m.PageDatatableExampleModule)},
      {path: 'dynamic-components', loadChildren: () => import('./pages/components/dynamic-component/page-dynamic-component.module').then(m => m.PageDynamicComponentModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
