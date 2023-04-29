import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ContainerComponent } from "./container/container.component";
import { TriggerComponent } from "./trigger/trigger.component";
import { CatDropdownModule } from "@catrx/ui/dropdown";
import { CatFormModule } from "@catrx/ui/form";

@NgModule({
  declarations: [ContainerComponent, TriggerComponent],
  exports: [ContainerComponent, TriggerComponent],
  imports: [
    CommonModule,
    CatDropdownModule,
    CatFormModule
  ]
})
export class CatOnDemandFilterModule { }