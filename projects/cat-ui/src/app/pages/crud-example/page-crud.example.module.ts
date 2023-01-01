import { NgModule } from '@angular/core';
import { PageCRUDExampleComponent } from './page-crud-example.component';
import { CommonModule } from '@angular/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatFormModule } from '@catrx/ui/form';
import { CatDatatableModule } from '@catrx/ui/datatable';
import { CatDialogModule } from '@catrx/ui/dialog';
import { CatConfirmModule } from '@catrx/ui/confirm';
import { PageCRUDExampleRoutingModule } from './page-crud-example.routing.module';

@NgModule({
  declarations: [PageCRUDExampleComponent],
  imports: [
    CommonModule,
    CatToolbarModule,
    CatFormModule,
    CatDatatableModule,
    CatDialogModule,
    CatConfirmModule,
    PageCRUDExampleRoutingModule
  ]
})
export class PageCRUDExampleModule { }
