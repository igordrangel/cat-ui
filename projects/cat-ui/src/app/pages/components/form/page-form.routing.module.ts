import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatAuthGuard } from '@catrx/ui/core';
import { PageFormComponent } from './page-form.component';

const routes: Routes = [
  { path: '', component: PageFormComponent, canActivate: [CatAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageFormRoutingModule {}
