import { NgModule } from '@angular/core';
import { DatatableComponent } from './datatable.component';
import { CommonModule } from '@angular/common';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { CatIconButtonComponent } from '@catrx/ui/icon-button';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatatableSortPipe } from './datatable-sort.pipe';
import { FormsModule } from '@angular/forms';
import { CatLoaderModule } from '@catrx/ui/loader';

@NgModule({
  declarations: [DatatableComponent, DatatableSortPipe],
  exports: [DatatableComponent],
  imports: [
    CommonModule,
    FormsModule,
    CatDynamicComponentModule,
    CatIconButtonComponent,
    CatLoaderModule,
    NgxPaginationModule,
  ],
})
export class CatDatatableModule {}
