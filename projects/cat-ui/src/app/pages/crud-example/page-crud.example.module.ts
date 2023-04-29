import { NgModule } from '@angular/core';
import { PageCRUDExampleComponent } from './page-crud-example.component';
import { CommonModule } from '@angular/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatFormModule } from '@catrx/ui/form';
import { CatDatatableModule } from '@catrx/ui/datatable';
import { CatDialogModule } from '@catrx/ui/dialog';
import { CatConfirmModule } from '@catrx/ui/confirm';
import { PageCRUDExampleRoutingModule } from './page-crud-example.routing.module';
import { CatIconButtonModule } from '@catrx/ui/icon-button';
import { CatPhotoComponent } from './cat-photo.component';
import { CatPrimaryButtonComponent } from '@catrx/ui/button/primary';
import { CatOnDemandFilterModule } from '@catrx/ui/on-demand-filter';

@NgModule({
  declarations: [PageCRUDExampleComponent, CatPhotoComponent],
  imports: [
    CommonModule,
    CatToolbarModule,
    CatFormModule,
    CatDatatableModule,
    CatDialogModule,
    CatConfirmModule,
    CatIconButtonModule,
    CatPrimaryButtonComponent,
    CatOnDemandFilterModule,
    PageCRUDExampleRoutingModule,
  ],
})
export class PageCRUDExampleModule { }
