import { NgModule } from '@angular/core';
import { CommonErrorsComponent } from './common-errors.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CommonErrorsComponent],
  exports: [CommonErrorsComponent],
  imports: [CommonModule],
})
export class CommonErrorsModule {}
