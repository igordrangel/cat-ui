import { Routes, RouterModule } from '@angular/router';
import { PageCRUDExampleComponent } from './page-crud-example.component';
import { NgModule } from '@angular/core';
import { CatAuthGuard } from '@catrx/ui/core';

const routes: Routes = [
  {
    path: '',
    component: PageCRUDExampleComponent,
    canActivate: [CatAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageCRUDExampleRoutingModule {}
