import { RouterModule, Routes } from '@angular/router';
import { PageStepperComponent } from './page-stepper.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: PageStepperComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageStepperRoutingModule {}
