import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppContainerComponent } from './app-container.component';
import { MenuModule } from '../menu/menu.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CatLoaderModule } from '@catrx/ui/loader';

@NgModule({
  declarations: [AppContainerComponent],
  exports: [AppContainerComponent],
  imports: [CommonModule, MenuModule, CatLoaderModule, MatTooltipModule],
})
export class AppContainerModule {}
