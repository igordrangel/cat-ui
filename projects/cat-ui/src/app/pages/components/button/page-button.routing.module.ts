import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageButtonComponent } from './page-button.component';

const routes: Routes = [{ path: '', component: PageButtonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageButtonRoutingModule {}
