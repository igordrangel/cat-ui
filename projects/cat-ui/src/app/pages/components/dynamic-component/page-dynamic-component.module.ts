import { NgModule } from '@angular/core';
import { CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { PageDynamicComponentComponent } from './page-dynamic-component.component';
import { HelloWorldComponent } from './hello-world.component';
import { PageDynamicComponentRoutingModule } from './page-dynamic-component.routing.module';

@NgModule({
  declarations: [PageDynamicComponentComponent, HelloWorldComponent],
  imports: [CatDynamicComponentModule, PageDynamicComponentRoutingModule],
})
export class PageDynamicComponentModule {}
