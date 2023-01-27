import { Component } from '@angular/core';
import { CatCRUDComponentBase } from '@catrx/ui/common';
import { CatConfirmService } from '@catrx/ui/confirm';
import { CatDatatableService } from '@catrx/ui/datatable';
import { CatDialogService } from '@catrx/ui/dialog';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { CatFormService } from '@catrx/ui/form';
import { CatLoaderPageService } from '@catrx/ui/loader-page';
import { CatSnackbarService } from '@catrx/ui/snackbar';
import { CatCsvService, CatXlsxService } from '@catrx/ui/utils';
import { CatPhotoComponent } from './cat-photo.component';
import { Cat, CatFilter, CatSexSelectOptions } from './services/cat.interface';
import { CatService } from './services/cat.service';

@Component({
  templateUrl: './page-crud-example.component.html',
  styles: [
    `
      cat-form {
        display: block;
        margin: 20px 20px 10px;
      }
    `,
  ],
})
export class PageCRUDExampleComponent extends CatCRUDComponentBase<
  CatFilter,
  Cat
> {
  filterConfig = this.filterFormBuilder
    .search('Filtro', 'filter', (builder) => builder.grid(3).generate())
    .onChange((data) => this.filterValueChanges$.next(data?.filter))
    .generate();

  listConfig = this.datatableService
    .build(this.filterValueChanges$, (filter) =>
      this.service.getDatatable(filter)
    )
    .setColumns(['Foto', 'Sexo', 'Raça'])
    .setItemLine({
      columnIndex: 0,
      component: (item) =>
        new CatDynamicComponent(CatPhotoComponent, item.photo),
    })
    .setItemLine({ columnIndex: 1, text: (item) => item.sex })
    .setItemLine({ columnIndex: 2, text: (item) => item.race })
    .setActionButton({
      iconName: 'fa-solid fa-pencil',
      tooltip: 'Editar',
      fnAction: (item) => this.openDialog(item),
    })
    .getSelection((selection) => (this.selection = selection))
    .getDatasource((datasource) => (this.datasource = datasource))
    .disableSelectionLineByRule((item) => item.race === 'Frajola')
    .hasSelection()
    .hasActions()
    .generate();

  constructor(
    protected override service: CatService,
    formService: CatFormService,
    datatableService: CatDatatableService,
    dialogService: CatDialogService,
    confirmService: CatConfirmService,
    csvService: CatCsvService,
    xlsxService: CatXlsxService,
    loaderService: CatLoaderPageService,
    snackbarService: CatSnackbarService
  ) {
    super(
      formService,
      datatableService,
      service,
      loaderService,
      snackbarService,
      dialogService,
      confirmService,
      { csv: csvService, xlsx: xlsxService }
    );
  }

  export(filename: string): void {
    this.exportByService(
      { xlsx: { filename, sheetName: 'Gatos' } },
      this.service.export()
    );
  }

  openDialog(data?: Cat) {
    this.openFormDialog(
      this.formService
        .build<Cat>(data)
        .text('Raça', 'race', (builder) =>
          builder.grid(6).setRequired().generate()
        )
        .select('Sexo', 'sex', (builder) =>
          builder
            .setOptions(CatSexSelectOptions)
            .grid(6)
            .setRequired()
            .generate()
        )
        .url('URL da Foto', 'photo', (builder) =>
          builder.setRequired().generate()
        )
        .onSubmit((cat) => this.service.save(cat, data?.id))
        .generate(),
      !!data,
      { title: 'Gato' }
    );
  }
}
