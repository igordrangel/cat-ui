import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldModule } from '../field/field.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from './list-item.component';
import { FormService } from '../../form.service';

@NgModule({
  declarations: [ListItemComponent],
  exports: [ListItemComponent],
  imports: [CommonModule, ReactiveFormsModule, FieldModule],
  providers: [FormService]
})
export class CatListItemModule { }
