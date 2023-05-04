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
          import('./pages/components/toolbar/page-toolbar.module').then(
            (m) => m.PageToolbarModule
          ),
      },
      {
        path: 'side-window',
        loadChildren: () =>
          import('./pages/components/side-window/page-side-window.module').then(
            (m) => m.PageSideWindowModule
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
        loadChildren: () =>
          import('./pages/components/snackbar/page-snackbar.module').then(
            (m) => m.PageSnackbarModule
          ),
      },
      {
        path: 'alert',
        loadComponent: () =>
          import('./pages/components/alert').then((m) => m.PageAlertComponent),
      },
      {
        path: 'button',
        loadChildren: () =>
          import('./pages/components/button/page-button.module').then(
            (m) => m.PageButtonModule
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
        loadChildren: () =>
          import('./pages/components/tooltip/page-tooltip.module').then(
            (m) => m.PageTooltipModule
          ),
      },
      {
        path: 'chip',
        loadComponent: () =>
          import('./pages/components/chip').then((m) => m.PageChipComponent),
      },
      {
        path: 'tab',
        loadChildren: () =>
          import('./pages/components/tab/page-tab.module').then(
            (m) => m.PageTabModule
          ),
      },
      {
        path: 'stepper',
        loadChildren: () =>
          import('./pages/components/stepper/page-stepper.module').then(
            (m) => m.PageStepperModule
          ),
      },
      {
        path: 'expansive-panel',
        loadChildren: () =>
          import(
            './pages/components/expansive-panel/page-expansive-panel.module'
          ).then((m) => m.PageExpansivePanelModule),
      },
      {
        path: 'on-demand-filter',
        loadChildren: () =>
          import(
            './pages/components/on-demand-filter/page-on-demand-filter.module'
          ).then((m) => m.PageOnDemandFilterModule),
      },
    ],
  },
  {
    path: 'services',
    children: [
      {
        path: 'csv',
        loadChildren: () =>
          import('./pages/services/csv/page-csv.module').then(
            (m) => m.PageCsvModule
          ),
      },
      {
        path: 'xlsx',
        loadChildren: () =>
          import('./pages/services/xlsx/page-xlsx.module').then(
            (m) => m.PageXlsxModule
          ),
      },
      {
        path: 'loader-page',
        loadChildren: () =>
          import('./pages/services/loader-page/page-loader-page.module').then(
            (m) => m.PageLoaderPageModule
          ),
      },
    ],
  },
  {
    path: 'examples',
    children: [
      {
        path: 'crud-page',
        loadChildren: () =>
          import('./pages/crud-example/page-crud.example.module').then(
            (m) => m.PageCRUDExampleModule
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
