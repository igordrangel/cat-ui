import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatUiModule } from '@catrx/ui/core';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [CatUiModule.forRoot(environment), AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
