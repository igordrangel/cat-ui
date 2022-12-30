import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { CommonModule } from '@angular/common';
import { CatToolbarService } from './cat-toolbar.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [CommonModule, RouterModule],
  providers: [CatToolbarService],
})
export class CatToolbarModule {}
