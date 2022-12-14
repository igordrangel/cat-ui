import { NgModule } from "@angular/core";
import { HintComponent } from "./hint.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [HintComponent],
  exports: [HintComponent],
  imports: [CommonModule]
})
export class HintModule {}
