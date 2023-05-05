import { NgModule } from '@angular/core';
import { PageCRUDExampleComponent } from './page-crud-example.component';
import { CommonModule } from '@angular/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatFormModule } from '@catrx/ui/form';
import { CatDatatableModule } from '@catrx/ui/datatable';
import { CatDialogComponent } from '@catrx/ui/dialog';
import { PageCRUDExampleRoutingModule } from './page-crud-example.routing.module';
import { CatIconButtonComponent } from '@catrx/ui/icon-button';
import { CatPhotoComponent } from './cat-photo.component';
import { CatOnDemandFilterModule } from '@catrx/ui/on-demand-filter';
import { CatConfirmComponent } from '@catrx/ui/confirm';

@NgModule({
  declarations: [PageCRUDExampleComponent, CatPhotoComponent],
  imports: [
    CommonModule,
    CatToolbarModule,
    CatFormModule,
    CatDatatableModule,
    CatDialogComponent,
    CatConfirmComponent,
    CatIconButtonComponent,
    CatOnDemandFilterModule,
    PageCRUDExampleRoutingModule,
  ],
})
export class PageCRUDExampleModule {}
