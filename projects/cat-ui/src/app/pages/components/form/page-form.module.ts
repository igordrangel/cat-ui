import { NgModule } from '@angular/core';
import { PageFormComponent } from './page-form.component';
import { CatFormModule } from '@catrx/ui/form';
import { PageFormRoutingModule } from './page-form.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PageListItemComponent } from './list-item/page-list-item.component';
import { CommonModule } from '@angular/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageCustomFieldComponent } from './custom-field/page-custom-field.component';
import { CatPrimaryButtonComponent } from '@catrx/ui/button/primary';

@NgModule({
  declarations: [
    PageFormComponent,
    PageListItemComponent,
    PageCustomFieldComponent,
  ],
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
