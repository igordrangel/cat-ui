import { NgModule } from "@angular/core";
import { CatButtonDirective } from "./cat-button.directive";

@NgModule({
  declarations: [CatButtonDirective],
  exports: [CatButtonDirective]
})
export class CatButtonModule { }
