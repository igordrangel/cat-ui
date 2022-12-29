import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFormComponent } from './page-form.component';

const routes: Routes = [
  { path: '', component: PageFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageFormRoutingModule {}
