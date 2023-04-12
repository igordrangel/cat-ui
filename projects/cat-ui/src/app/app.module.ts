import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatUiModule } from '@catrx/ui';
import { environment } from '../environments/environment';
import { CatDropdownModule } from '@catrx/ui/dropdown';
import { CatTooltipModule } from '@catrx/ui/tooltip';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CatUiModule.forRoot(environment, {
      xlsxConfig: {
        headerBackgroundColor: '#212121',
        headerFontColor: '#f1f1f1',
        normalizeHeader: true,
        password: '123',
      },
    }),
    CatDropdownModule,
    CatTooltipModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
