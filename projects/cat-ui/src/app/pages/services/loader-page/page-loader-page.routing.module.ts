import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoaderPageComponent } from './page-loader-page.component';

const routes: Routes = [{ path: '', component: PageLoaderPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageLoaderPageRoutingModule {}
