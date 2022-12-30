import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CatFieldsetModule } from "./components/fieldset/cat-fieldset.module";
import { FieldModule } from "./components/field/field.module";

@NgModule({
  declarations: [FormComponent],
  exports: [FormComponent, ReactiveFormsModule],
  imports: [CommonModule, ReactiveFormsModule, CatFieldsetModule, FieldModule],
})
export class CatFormModule {}
