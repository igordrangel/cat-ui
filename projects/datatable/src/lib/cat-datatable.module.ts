import { NgModule } from '@angular/core';
import { DatatableComponent } from './datatable.component';
import { CommonModule } from "@angular/common";
import { CatDynamicComponentModule } from "@cat-ui/dynamic-component";
import { CatIconButtonModule } from "@cat-ui/icon-button";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { DatatableSortPipe } from "./datatable-sort.pipe";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

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
    CatIconButtonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatProgressSpinnerModule
  ]
})
export class CatDatatableModule { }
