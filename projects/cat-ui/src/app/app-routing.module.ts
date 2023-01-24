import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'components',
    children: [
      {
        path: 'datatable',
        loadChildren: () =>
          import(
            './pages/components/datatable/page-datatable-example.module'
          ).then((m) => m.PageDatatableExampleModule),
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
        loadChildren: () =>
          import(
            './pages/components/dynamic-component/page-dynamic-component.module'
          ).then((m) => m.PageDynamicComponentModule),
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
        loadChildren: () =>
          import('./pages/components/dialog/page-dialog.module').then(
            (m) => m.PageDialogModule
          ),
      },
      {
        path: 'confirm',
        loadChildren: () =>
          import('./pages/components/confirm/page-confirm.module').then(
            (m) => m.PageConfirmModule
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
        loadChildren: () =>
          import('./pages/components/alert/page-alert.module').then(
            (m) => m.PageAlertModule
          ),
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
        loadChildren: () =>
          import('./pages/components/dropdown/page-dropdown.module').then(
            (m) => m.PageDropdownModule
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
        loadChildren: () =>
          import('./pages/components/chip/page-chip.module').then(
            (m) => m.PageChipModule
          ),
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
