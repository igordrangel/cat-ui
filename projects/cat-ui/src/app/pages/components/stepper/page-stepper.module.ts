import { NgModule } from '@angular/core';
import { PageStepperComponent } from './page-stepper.component';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatStepperModule } from '@catrx/ui/stepper';
import { PageStepperRoutingModule } from './page-stepper.routing.module';
import { CatPrimaryButtonComponent } from '@catrx/ui/button/primary';
import { CatSecondaryButtonComponent } from '@catrx/ui/button/secondary';

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
