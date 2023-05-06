import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'components',
    children: [
      {
        path: 'datatable',
        loadComponent: () =>
          import('./pages/components/datatable').then(
            (m) => m.PageDatatableExampleComponent
          ),
      },
      {
        path: 'form',
        loadChildren: () =>
          import('./pages/components/form/page-form.module').then(
            (m) => m.PageFormModule
          ),
      },
      {
        path: 'dynamic-components',
        loadComponent: () =>
          import('./pages/components/dynamic-component').then(
            (m) => m.PageDynamicComponentComponent
          ),
      },
      {
        path: 'toolbar',
        loadChildren: () =>
          import('./pages/components/toolbar/routes').then((m) => m.ROUTES),
      },
      {
        path: 'side-window',
        loadComponent: () =>
          import('./pages/components/side-window').then(
            (m) => m.PageSideWindowComponent
          ),
      },
      {
        path: 'dialog',
        loadComponent: () =>
          import('./pages/components/dialog').then(
            (m) => m.PageDialogComponent
          ),
      },
      {
        path: 'confirm',
        loadComponent: () =>
          import('./pages/components/confirm').then(
            (m) => m.PageConfirmComponent
          ),
      },
      {
        path: 'snackbar',
        loadComponent: () =>
          import('./pages/components/snackbar').then(
            (m) => m.PageSnackbarComponent
          ),
      },
      {
        path: 'alert',
        loadComponent: () =>
          import('./pages/components/alert').then((m) => m.PageAlertComponent),
      },
      {
        path: 'button',
        loadComponent: () =>
          import('./pages/components/button').then(
            (m) => m.PageButtonComponent
          ),
      },
      {
        path: 'dropdown',
        loadComponent: () =>
          import('./pages/components/dropdown').then(
            (m) => m.PageDropdownComponent
          ),
      },
      {
        path: 'tooltip',
        loadComponent: () =>
          import('./pages/components/tooltip').then(
            (m) => m.PageTooltipComponent
          ),
      },
      {
        path: 'chip',
        loadComponent: () =>
          import('./pages/components/chip').then((m) => m.PageChipComponent),
      },
      {
        path: 'tab',
        loadComponent: () =>
          import('./pages/components/tab').then((m) => m.PageTabComponent),
      },
      {
        path: 'stepper',
        loadComponent: () =>
          import('./pages/components/stepper').then(
            (m) => m.PageStepperComponent
          ),
      },
      {
        path: 'expansive-panel',
        loadComponent: () =>
          import('./pages/components/expansive-panel').then(
            (m) => m.PageExpansivePanelComponent
          ),
      },
      {
        path: 'on-demand-filter',
        loadComponent: () =>
          import('./pages/components/on-demand-filter').then(
            (m) => m.PageOnDemandFilterComponent
          ),
      },
    ],
  },
  {
    path: 'services',
    children: [
      {
        path: 'csv',
        loadComponent: () =>
          import('./pages/services/csv').then((m) => m.PageCsvComponent),
      },
      {
        path: 'xlsx',
        loadChildren: () =>
          import('./pages/services/xlsx').then((m) => m.PageXlsxComponent),
      },
      {
        path: 'loader-page',
        loadComponent: () =>
          import('./pages/services/loader-page').then(
            (m) => m.PageLoaderPageComponent
          ),
      },
    ],
  },
  {
    path: 'examples',
    children: [
      {
        path: 'crud-page',
        loadComponent: () =>
          import('./pages/crud-example').then(
            (m) => m.PageCRUDExampleComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
