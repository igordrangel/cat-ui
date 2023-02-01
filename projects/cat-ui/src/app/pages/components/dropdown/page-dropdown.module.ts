import { NgModule } from '@angular/core';
import { PageDropdownComponent } from './page-dropdown.component';
import { CommonModule } from '@angular/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatDropdownModule } from '@catrx/ui/dropdown';
import { PageDropdownRoutingModule } from './page-dropdown.routing.module';
import { CatPrimaryButtonComponent } from '@catrx/ui/button/src/lib/components/primary';

@NgModule({
  declarations: [PageDropdownComponent],
  imports: [
    CommonModule,
    CatToolbarModule,
    CatPrimaryButtonComponent,
    CatDropdownModule,
    PageDropdownRoutingModule,
  ],
})
export class PageDropdownModule {}
