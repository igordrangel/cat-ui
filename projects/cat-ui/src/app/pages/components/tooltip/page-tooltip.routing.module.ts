import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageTooltipComponent } from './page-tooltip.component';

const routes: Routes = [
  {path: '', component: PageTooltipComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageTooltipRoutingModule { }
