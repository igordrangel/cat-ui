import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ContainerComponent } from "./container/container.component";
import { TriggerComponent } from "./trigger/trigger.component";
import { CatDropdownModule } from "@catrx/ui/dropdown";
import { CatFormModule } from "@catrx/ui/form";
import { TriggerDirective } from "./trigger/trigger.directive";
import { SelectedOptionsDirective } from "./selected-options/selected-options.directive";
import { SelectedOptionsComponent } from "./selected-options/selected-options.component";
import { CatTooltipModule } from "@catrx/ui/tooltip";

@NgModule({
  declarations: [
    ContainerComponent,
    TriggerComponent,
    TriggerDirective,
    SelectedOptionsComponent,
    SelectedOptionsDirective
  ],
  exports: [
    ContainerComponent,
    TriggerDirective,
    SelectedOptionsDirective
  ],
  imports: [
    CommonModule,
    CatDropdownModule,
    CatFormModule,
    CatTooltipModule
  ]
})
export class CatOnDemandFilterModule { }