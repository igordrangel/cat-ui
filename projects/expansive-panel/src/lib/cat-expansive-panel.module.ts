import { ExpansivePanelComponent } from './panel/expansive-panel.component';
import { NgModule } from '@angular/core';
import { ExpansivePanelGroupComponent } from './group/expansive-panel-group.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ExpansivePanelGroupComponent, ExpansivePanelComponent],
  exports: [ExpansivePanelGroupComponent, ExpansivePanelComponent],
  imports: [CommonModule],
})
export class CatExpansivePanelModule {}
