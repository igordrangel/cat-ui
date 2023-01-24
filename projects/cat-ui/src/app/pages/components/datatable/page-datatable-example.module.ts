import { NgModule } from '@angular/core';
import { PageDatatableExampleRoutingModule } from './page-datatable-example.routing.module';
import { PageDatatableExampleComponent } from './page-datatable-example.component';
import { CatDatatableModule } from '@catrx/ui/datatable';
import { CatFormModule } from '@catrx/ui/form';

@NgModule({
  declarations: [PageDatatableExampleComponent],
  imports: [
    CatFormModule,
    CatDatatableModule,
    PageDatatableExampleRoutingModule,
  ],
})
export class PageDatatableExampleModule {}
