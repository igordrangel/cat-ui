import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { CommonModule } from "@angular/common";
import { InputTextModule } from "./components/field/components/input-text/input-text.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CatFieldsetModule } from "./components/fieldset/cat-fieldset.module";
import { FieldModule } from "./components/field/field.module";

@NgModule({
  declarations: [FormComponent],
  exports: [
    FormComponent,
    InputTextModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatFieldsetModule,
    FieldModule
  ]
})
export class CatFormModule { }
