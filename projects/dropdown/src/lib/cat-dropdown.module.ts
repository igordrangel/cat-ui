import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CatDropdownComponent } from "./dropdown.component";

@NgModule({
  declarations: [CatDropdownComponent],
  exports: [CatDropdownComponent],
  imports: [CommonModule, BsDropdownModule.forRoot()],
})
export class CatDropdownModule {}
