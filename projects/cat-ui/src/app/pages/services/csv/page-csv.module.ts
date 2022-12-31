import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageCsvComponent } from './page-csv.component';
import { PageCsvRoutingModule } from './page-csv.routing.module';

@NgModule({
  declarations: [PageCsvComponent],
  imports: [CommonModule, CatToolbarModule, PageCsvRoutingModule],
})
export class PageCsvModule {}
