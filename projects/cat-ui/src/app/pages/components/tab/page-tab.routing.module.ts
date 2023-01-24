import { RouterModule, Routes } from '@angular/router';
import { PageTabComponent } from './page-tab.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: PageTabComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageTabRoutingModule {}
