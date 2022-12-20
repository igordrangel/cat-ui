import { NgModule } from '@angular/core';
import { PageFormComponent } from './page-form.component';
import { CatFormModule } from '@catrx/ui/form';
import { PageFormRoutingModule } from './page-form.routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PageFormComponent],
  imports: [CatFormModule, PageFormRoutingModule, HttpClientModule]
})
export class PageFormModule {}
