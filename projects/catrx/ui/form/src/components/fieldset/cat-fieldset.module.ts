import { NgModule } from '@angular/core';
import { FieldsetComponent } from './fieldset.component';
import { CommonModule } from '@angular/common';
import { FieldModule } from '../field/field.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CatListItemModule } from '../list-item/cat-list-item.module';

@NgModule({
  declarations: [FieldsetComponent],
  exports: [FieldsetComponent],
  imports: [CommonModule, ReactiveFormsModule, CatListItemModule, FieldModule],
})
export class CatFieldsetModule {}
