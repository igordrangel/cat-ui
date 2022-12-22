import { RouterModule, Routes } from '@angular/router';
import { PageDynamicComponentComponent } from './page-dynamic-component.component';
import { NgModule } from '@angular/core';
import { CatAuthGuard } from '@catrx/ui/core';

const routes: Routes = [
  {
    path: '',
    component: PageDynamicComponentComponent,
    canActivate: [CatAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDynamicComponentRoutingModule {}
