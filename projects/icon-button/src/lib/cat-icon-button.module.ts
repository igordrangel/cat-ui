import { NgModule } from '@angular/core';
import { IconButtonComponent } from './icon-button.component';
import { CommonModule } from "@angular/common";
import { CatTooltipModule } from '@catrx/ui/tooltip';

@NgModule({
  declarations: [IconButtonComponent],
  exports: [IconButtonComponent],
  imports: [
    CommonModule,
    CatTooltipModule
  ]
})
export class CatIconButtonModule { }
