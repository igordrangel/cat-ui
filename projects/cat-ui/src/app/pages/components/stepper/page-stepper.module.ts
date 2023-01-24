import { NgModule } from '@angular/core';
import { PageStepperComponent } from './page-stepper.component';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatStepperModule } from '@catrx/ui/stepper';
import {
  CatPrimaryButtonComponent,
  CatSecondaryButtonComponent,
} from '@catrx/ui/button';
import { PageStepperRoutingModule } from './page-stepper.routing.module';

@NgModule({
  declarations: [PageStepperComponent],
  imports: [
    CatToolbarModule,
    CatStepperModule,
    CatPrimaryButtonComponent,
    CatSecondaryButtonComponent,
    PageStepperRoutingModule,
  ],
})
export class PageStepperModule {}
