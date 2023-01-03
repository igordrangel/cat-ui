import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageSideWindowComponent } from './page-side-window.component';

const routes: Routes = [{ path: '', component: PageSideWindowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSideWindowRoutingModule {}
