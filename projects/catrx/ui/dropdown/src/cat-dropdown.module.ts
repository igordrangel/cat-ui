import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatDropdownDirective } from './cat-dropdown.directive';
import { DropdownContentComponent } from './dropdown-content.component';
import { DropdownComponent } from './dropdown.component';

@NgModule({
  declarations: [
    CatDropdownDirective,
    DropdownContentComponent,
    DropdownComponent,
  ],
  exports: [DropdownComponent],
  imports: [CommonModule],
})
export class CatDropdownModule {}
