import { NgModule } from '@angular/core';
import { DatatableComponent } from './datatable.component';
import { CommonModule } from "@angular/common";
import { CatDynamicComponentModule } from "@cat-ui/dynamic-component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { DatatableSortPipe } from "./datatable-sort.pipe";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    DatatableComponent,
    DatatableSortPipe
  ],
  exports: [DatatableComponent],
  imports: [
    CommonModule,
    FormsModule,
    CatDynamicComponentModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatTooltipModule
  ]
})
export class CatDatatableModule { }
