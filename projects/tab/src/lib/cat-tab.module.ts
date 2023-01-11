import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabGroupComponent } from './group/tab-group.component';
import { TabItemComponent } from './item/tab-item.component';

@NgModule({
  declarations: [TabGroupComponent, TabItemComponent],
  exports: [TabGroupComponent, TabItemComponent],
  imports: [CommonModule],
})
export class CatTabModule {}
