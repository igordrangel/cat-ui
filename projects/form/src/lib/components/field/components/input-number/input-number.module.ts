import { NgModule } from "@angular/core";
import { InputNumberComponent } from "./input-number.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FieldContentModule } from "../common/field-content/field-content.module";

@NgModule({
  declarations: [InputNumberComponent],
  exports: [InputNumberComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldContentModule
  ]
})
export class InputNumberModule {}
