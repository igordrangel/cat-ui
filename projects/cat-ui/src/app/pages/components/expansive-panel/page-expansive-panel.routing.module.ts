import { RouterModule, Routes } from '@angular/router';
import { PageExpansivePanelComponent } from './page-expansive-panel.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: PageExpansivePanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageExpansivePanelRoutingModule {}
