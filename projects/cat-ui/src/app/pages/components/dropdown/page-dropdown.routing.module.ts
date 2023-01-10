import { Routes, RouterModule } from '@angular/router';
import { PageDropdownComponent } from './page-dropdown.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: PageDropdownComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageDropdownRoutingModule {}
