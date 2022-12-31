import { NgModule } from '@angular/core';
import { PageDialogComponent } from './page-dialog.component';
import { CommonModule } from '@angular/common';
import { CatDialogModule } from '@catrx/ui/dialog';
import { PageDialogRoutingModule } from './page-dialog.routing.module';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { DialogExampleComponent } from './dialog-example.component';
import { CatFormModule } from '@catrx/ui/form';

@NgModule({
  declarations: [PageDialogComponent, DialogExampleComponent],
  imports: [
    CommonModule,
    CatToolbarModule,
    CatDialogModule,
    CatFormModule,
    PageDialogRoutingModule,
  ],
})
export class PageDialogModule {}
