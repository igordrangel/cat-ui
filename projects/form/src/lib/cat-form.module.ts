import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { CommonModule } from "@angular/common";
import { CatInputTextModule } from "./components/field/components/input-text/cat-input-text.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CatFieldsetModule } from "./components/fieldset/cat-fieldset.module";
import { CatFieldModule } from "./components/field/cat-field.module";

@NgModule({
  declarations: [FormComponent],
  exports: [
    FormComponent,
    CatInputTextModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatFieldsetModule,
    CatFieldModule
  ]
})
export class CatFormModule { }
