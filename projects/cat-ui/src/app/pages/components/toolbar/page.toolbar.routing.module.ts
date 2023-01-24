import { Routes, RouterModule } from '@angular/router';
import { PageToolbarComponent } from './page-toolbar.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: PageToolbarComponent },
  { path: ':subpage', component: PageToolbarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageToolbarRoutingModule {}
