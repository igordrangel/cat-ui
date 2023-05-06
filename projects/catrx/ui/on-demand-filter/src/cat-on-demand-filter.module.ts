import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatDropdownModule } from '@catrx/ui/dropdown';
import { CatFormModule } from '@catrx/ui/form';
import { CatTooltipModule } from '@catrx/ui/tooltip';
import { SelectedOptionsComponent } from './selected-options/selected-options.component';
import { SelectedOptionsDirective } from './selected-options/selected-options.directive';
import { TriggerComponent } from './trigger/trigger.component';
import { TriggerDirective } from './trigger/trigger.directive';
import { CatButtonModule } from '@catrx/ui/button';

@NgModule({
  declarations: [
    TriggerComponent,
    TriggerDirective,
    SelectedOptionsComponent,
    SelectedOptionsDirective,
  ],
  exports: [TriggerDirective, SelectedOptionsDirective],
  imports: [CommonModule, CatDropdownModule, CatFormModule, CatTooltipModule, CatButtonModule],
})
export class CatOnDemandFilterModule {}
