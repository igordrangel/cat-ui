import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatDropdownDirective } from './cat-dropdown.directive';
import { DropdownContentComponent } from './content/dropdown-content.component';
import { CatDropdownComponent } from './dropdown.component';

@NgModule({
  declarations: [CatDropdownDirective, CatDropdownComponent, DropdownContentComponent],
  exports: [CatDropdownComponent],
  imports: [CommonModule],
})
export class CatDropdownModule { }
