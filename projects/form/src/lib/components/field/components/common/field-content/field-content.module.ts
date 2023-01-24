import { NgModule } from '@angular/core';
import { FieldContentComponent } from './field-content.component';
import { CommonModule } from '@angular/common';
import { HintModule } from '../hint/hint.module';
import { CommonErrorsModule } from '../common-errors/common-errors.module';

@NgModule({
  declarations: [FieldContentComponent],
  exports: [FieldContentComponent],
  imports: [CommonModule, HintModule, CommonErrorsModule],
})
export class FieldContentModule {}
