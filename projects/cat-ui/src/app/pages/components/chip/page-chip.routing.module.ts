import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageChipComponent } from './page-chip.component';

const routes: Routes = [{ path: '', component: PageChipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageChipRoutingModule {}
