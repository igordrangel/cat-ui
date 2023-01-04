import { NgModule } from '@angular/core';
import { PageFormComponent } from './page-form.component';
import { CatFormModule } from '@catrx/ui/form';
import { PageFormRoutingModule } from './page-form.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PageListItemComponent } from './list-item/page-list-item.component';
import { CatPrimaryButtonComponent } from '@catrx/ui/button';
import { CommonModule } from '@angular/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@NgModule({
  declarations: [PageFormComponent, PageListItemComponent],
  imports: [
    CommonModule,
    CatToolbarModule,
    CatFormModule,
    CatPrimaryButtonComponent,
    HttpClientModule,
    PageFormRoutingModule,
  ],
})
export class PageFormModule {}
