import { NgModule } from '@angular/core';
import { CatPrimaryButtonComponent } from '@catrx/ui/button';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageLoaderPageComponent } from './page-loader-page.component';
import { PageLoaderPageRoutingModule } from './page-loader-page.routing.module';

@NgModule({
  declarations: [PageLoaderPageComponent],
  imports: [
    CatToolbarModule,
    CatPrimaryButtonComponent,
    PageLoaderPageRoutingModule,
  ],
})
export class PageLoaderPageModule {}
