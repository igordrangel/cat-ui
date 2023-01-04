import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageXlsxComponent } from './page-xlsx.component';
import { PageXlsxRoutingModule } from './page-xlsx.routing.module';

@NgModule({
  declarations: [PageXlsxComponent],
  imports: [CommonModule, CatToolbarModule, PageXlsxRoutingModule],
})
export class PageXlsxModule {}
