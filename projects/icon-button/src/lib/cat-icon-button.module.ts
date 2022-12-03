import { NgModule } from '@angular/core';
import { IconButtonComponent } from './icon-button.component';
import { CommonModule } from "@angular/common";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [IconButtonComponent],
  exports: [IconButtonComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ]
})
export class CatIconButtonModule { }
