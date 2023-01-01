import { Component } from '@angular/core';
import { CatCRUDComponentBase } from '@catrx/ui/common';
import { CatDatatableService } from '@catrx/ui/datatable';
import { CatDialogService } from '@catrx/ui/dialog';
import { CatFormService } from '@catrx/ui/form';
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
export class PageCRUDExampleComponent extends CatCRUDComponentBase<CatFilter> {
  filterConfig = this.filterFormBuilder
    .search('Filtro', 'filter', (builder) => builder.grid(3).generate())
    .onChange((data) => this.filterValueChanges$.next(data))
    .generate();

  listConfig = this.datatableService
    .build(this.filterValueChanges$, (filter) => this.service.getDatatable(filter))
    .setColumns(['Foto', 'Sexo', 'Raça'])
    .setItemLine({ columnIndex: 0, text: (item) => item.photo })
    .setItemLine({ columnIndex: 1, text: (item) => item.sex })
    .setItemLine({ columnIndex: 2, text: (item) => item.race })
    .generate();

  constructor(
    formService: CatFormService,
    datatableService: CatDatatableService,
    dialogService: CatDialogService,
    protected override service: CatService
  ) {
    super(formService, datatableService, dialogService, service);
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
      {title: 'Gato'}
    );
  }
}
