import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageSnackbarComponent } from './page-snackbar.component';

const routes: Routes = [{ path: '', component: PageSnackbarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageSnackbarRoutingModule { }
