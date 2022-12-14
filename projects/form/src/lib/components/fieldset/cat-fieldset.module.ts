import { NgModule } from "@angular/core";
import { FieldsetComponent } from "./fieldset.component";
import { CommonModule } from "@angular/common";
import { FieldModule } from "../field/field.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [FieldsetComponent],
  exports: [FieldsetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldModule
  ]
})
export class CatFieldsetModule {}
