import { NgModule } from '@angular/core';
import { CatExpansivePanelModule } from '@catrx/ui/expansive-panel';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageExpansivePanelRoutingModule } from './page-expansive-panel.routing.module';
import { PageExpansivePanelComponent } from './page-expansive-panel.component';

@NgModule({
  declarations: [PageExpansivePanelComponent],
  imports: [
    CatToolbarModule,
    CatExpansivePanelModule,
    PageExpansivePanelRoutingModule,
  ],
})
export class PageExpansivePanelModule {}
