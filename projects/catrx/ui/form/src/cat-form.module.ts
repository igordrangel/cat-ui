import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldModule } from './components/field/field.module';
import { CatFieldsetModule } from './components/fieldset/cat-fieldset.module';
import { CatListItemModule } from './components/list-item/cat-list-item.module';
import { FormComponent } from './form.component';

@NgModule({
  declarations: [FormComponent],
  exports: [FormComponent, ReactiveFormsModule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatFieldsetModule,
    CatListItemModule,
    FieldModule,
  ]
})
export class CatFormModule { }
