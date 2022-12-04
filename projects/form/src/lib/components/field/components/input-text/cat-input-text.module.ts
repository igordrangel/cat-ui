import { NgModule } from "@angular/core";
import { InputTextComponent } from "./input-text.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [InputTextComponent],
  exports: [InputTextComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CatInputTextModule {}
