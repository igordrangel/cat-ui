import { Routes } from '@angular/router';
import { PageToolbarComponent } from '.';

export const ROUTES: Routes = [
  { path: '', component: PageToolbarComponent },
  { path: ':subpage', component: PageToolbarComponent },
];
