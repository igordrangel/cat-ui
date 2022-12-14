import { NgModule } from "@angular/core";
import { FieldComponent } from "./field.component";
import { CommonModule } from "@angular/common";
import { InputTextModule } from "./components/input-text/input-text.module";
import { TextareaModule } from "./components/textarea/textarea.module";
import { InputNumberModule } from "./components/input-number/input-number.module";
import { InputDatetimeModule } from './components/input-datetime/input-datetime.module';

@NgModule({
  declarations: [FieldComponent],
  exports: [FieldComponent],
  imports: [
    CommonModule,
    InputTextModule,
    InputNumberModule,
    InputDatetimeModule,
    TextareaModule
  ]
})
export class FieldModule {}
