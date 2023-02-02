import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StepperGroupComponent } from './group/stepper-group.component';
import { StepperItemComponent } from './item/stepper-item.component';

@NgModule({
  declarations: [StepperGroupComponent, StepperItemComponent],
  exports: [StepperGroupComponent, StepperItemComponent],
  imports: [CommonModule],
})
export class CatStepperModule {}
