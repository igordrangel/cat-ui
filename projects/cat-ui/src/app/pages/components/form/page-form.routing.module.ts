import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCustomFieldComponent } from './custom-field/page-custom-field.component';
import { PageListItemComponent } from './list-item/page-list-item.component';
import { PageFormComponent } from './page-form.component';

const routes: Routes = [
  { path: '', component: PageFormComponent },
  { path: 'list-item', component: PageListItemComponent },
  { path: 'custom-field', component: PageCustomFieldComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageFormRoutingModule {}
