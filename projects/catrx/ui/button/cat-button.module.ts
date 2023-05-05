import { NgModule } from "@angular/core";
import { CatLoaderModule } from '@catrx/ui/loader';
import { CatButtonDirective } from "./cat-button.directive";
import { LoaderButtonComponent } from "./loader-button.component";

@NgModule({
  declarations: [CatButtonDirective, LoaderButtonComponent],
  exports: [CatButtonDirective],
  imports: [CatLoaderModule]
})
export class CatButtonModule { }
