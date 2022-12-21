import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatUiModule } from '@catrx/ui/core';

@NgModule({
  declarations: [AppComponent],
  imports: [CatUiModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
