import { Component } from '@angular/core';
import { CatCRUDComponentBase } from '@catrx/ui/common';
import { CatConfirmService } from '@catrx/ui/confirm';
import { CatDatatableModule, CatDatatableService } from '@catrx/ui/datatable';
import { CatDialogService } from '@catrx/ui/dialog';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { CatFormService } from '@catrx/ui/form';
import { CatIconButtonComponent } from '@catrx/ui/icon-button';
import { CatLoaderPageService } from '@catrx/ui/loader-page';
import { CatOnDemandFilterModule } from '@catrx/ui/on-demand-filter';
import { CatOnDemandFilterService } from '@catrx/ui/on-demand-filter/src/cat-on-demand-filter.service';
import { CatSnackbarService } from '@catrx/ui/snackbar';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { CatCsvService } from '@catrx/ui/utils/csv';
import { CatXlsxService } from '@catrx/ui/utils/xlsx';
import { klDelay } from '@koalarx/utils/operators/delay';
import { CatPhotoComponent } from './cat-photo.component';
import { Cat, CatFilter, CatSexSelectOptions } from './services/cat.interface';
import { CatService } from './services/cat.service';

@Component({
  standalone: true,
  imports: [
    CatToolbarModule,
    CatOnDemandFilterModule,
    CatDatatableModule,
    CatIconButtonComponent,
  ],
  template: `
    <cat-toolbar [config]="getToolbarInfo(true)" [spaceBetween]="false">
      <nav buttons>
        <div [catOnDemandFilterTrigger]="filterConfig">Buscar</div>
      </nav>
    </cat-toolbar>

    <div [catOnDemandFilterSelectedOptions]="filterConfig"></div>

    <cat-datatable [config]="listConfig">
      <nav list-checked-actions>
        <cat-icon-button
          (click)="deleteSelected()"
          icon="fa-solid fa-trash-can"
          tooltip="Excluir Selecionados"
        />
      </nav>

      <nav list-actions>
        <cat-icon-button
          [disabled]="datasource?.length === 0"
          (click)="export('Lista de Gatos')"
          icon="fa-solid fa-download"
          tooltip="Exportar Lista"
        />

        <cat-icon-button
          (click)="openDialog()"
          icon="fa-solid fa-circle-plus"
          tooltip="Incluir Gato"
        />
      </nav>
    </cat-datatable>
  `,
})
export class PageCRUDExampleComponent extends CatCRUDComponentBase<
  CatFilter,
  Cat
> {
  filterConfig = this.onDemandFilterService
    .build<CatFilter>()
    .setOption(
      (formBuilder) =>
        formBuilder.select('Sexo', 'sex', (builder) =>
          builder.setOptions(CatSexSelectOptions).generate()
        ),
      'fa-solid fa-genderless'
    )
    .setOption(
      (formBuilder) =>
        formBuilder.text('Raça', 'race', (builder) => builder.generate()),
      'fa-solid fa-paw'
    )
    .onSubmit(async (data) => {
      console.log(data);
      while ((this.datasource?.length ?? 0) === 0) {
        await klDelay(50);
      }
      this.filterValueChanges$.next(data);
    })
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
    snackbarService: CatSnackbarService,
    private onDemandFilterService: CatOnDemandFilterService
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
