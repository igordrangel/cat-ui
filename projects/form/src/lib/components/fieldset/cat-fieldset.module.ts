import { NgModule } from "@angular/core";
import { FieldsetComponent } from "./fieldset.component";
import { CommonModule } from "@angular/common";
import { CatFieldModule } from "../field/cat-field.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [FieldsetComponent],
  exports: [FieldsetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatFieldModule
  ]
})
export class CatFieldsetModule {}
