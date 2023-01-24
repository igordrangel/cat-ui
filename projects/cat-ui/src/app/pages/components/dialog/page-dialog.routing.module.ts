import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageDialogComponent } from './page-dialog.component';

const routes: Routes = [{ path: '', component: PageDialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDialogRoutingModule {}
