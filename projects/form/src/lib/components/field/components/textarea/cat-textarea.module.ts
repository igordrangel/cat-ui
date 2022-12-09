import { NgModule } from "@angular/core";
import { TextareaComponent } from "./textarea.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [TextareaComponent],
  exports: [TextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CatTextareaModule {}
