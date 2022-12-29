import { RouterModule, Routes } from '@angular/router';
import { PageDynamicComponentComponent } from './page-dynamic-component.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PageDynamicComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDynamicComponentRoutingModule {}
