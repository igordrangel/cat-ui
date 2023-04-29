import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ContainerComponent } from "./container/container.component";
import { TriggerComponent } from "./trigger/trigger.component";

@NgModule({
  declarations: [ContainerComponent, TriggerComponent],
  exports: [ContainerComponent, TriggerComponent],
  imports: [
    CommonModule
  ]
})
export class CatOnDemandFilterModule { }