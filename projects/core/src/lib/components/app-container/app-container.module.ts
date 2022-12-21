import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppContainerComponent } from './app-container.component';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [AppContainerComponent],
  exports: [AppContainerComponent],
  imports: [CommonModule, MenuModule],
})
export class AppContainerModule {}
