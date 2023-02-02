import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatPrimaryButtonComponent } from '@catrx/ui/button/primary';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatTooltipModule } from '@catrx/ui/tooltip';
import { PageTooltipComponent } from './page-tooltip.component';
import { PageTooltipRoutingModule } from './page-tooltip.routing.module';

@NgModule({
  declarations: [PageTooltipComponent],
  imports: [
    CommonModule,
    CatToolbarModule,
    CatPrimaryButtonComponent,
    CatTooltipModule,
    PageTooltipRoutingModule,
  ],
})
export class PageTooltipModule {}
