import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { NgModule } from '@angular/core';
import { CatChipModule } from '@catrx/ui/chip';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageChipComponent } from './page-chip.component';
import { PageChipRoutingModule } from './page-chip.routing.module';

@NgModule({
  declarations: [PageChipComponent],
  imports: [
    CatToolbarModule,
    CatChipModule,
    CatDynamicComponentModule,
    PageChipRoutingModule,
  ],
})
export class PageChipModule {}
