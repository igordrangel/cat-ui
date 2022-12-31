import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageConfirmComponent } from './page-confirm.component';

const routes: Routes = [
  {path: '', component: PageConfirmComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageConfirmRoutingModule {}
