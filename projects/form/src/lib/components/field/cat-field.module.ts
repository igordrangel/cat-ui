import { NgModule } from "@angular/core";
import { FieldComponent } from "./field.component";
import { CommonModule } from "@angular/common";
import { CatInputTextModule } from "./components/input-text/cat-input-text.module";
import { CatTextareaModule } from "./components/textarea/cat-textarea.module";

@NgModule({
  declarations: [FieldComponent],
  exports: [FieldComponent],
  imports: [
    CommonModule,
    CatInputTextModule,
    CatTextareaModule
  ]
})
export class CatFieldModule {}
