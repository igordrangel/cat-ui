import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatDatatableModule, CatDatatableService } from '@catrx/ui/datatable';
import {
  CatOnDemandFilterModule,
  CatOnDemandFilterService,
} from '@catrx/ui/on-demand-filter';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { PageDatatableExampleService } from './page-datatable-example.service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatDatatableModule, CatOnDemandFilterModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()" [spaceBetween]="false">
      <nav buttons>
        <div [catOnDemandFilterTrigger]="filterConfig">Filtro</div>
      </nav>
    </cat-toolbar>

    <div [catOnDemandFilterSelectedOptions]="filterConfig"></div>

    <cat-datatable [config]="datatableConfig"></cat-datatable>
  `,
})
export class PageDatatableExampleComponent extends CatComponentBase {
  datatableFilter$ = new Subject();

  filterConfig = this.filterService
    .build<any>()
    .setOption((formBuilder) =>
      formBuilder.text('Estado', 'uf', (builder) =>
        builder.setMinLength(2).setMaxLength(2).generate()
      )
    )
    .setOption((formBuilder) =>
      formBuilder.text('Municipio', 'municipio', (builder) =>
        builder.generate()
      )
    )
    .onSubmit((data) => this.datatableFilter$.next(data))
    .autofill({ uf: 'RJ' })
    .generate();

  datatableConfig = this.datatableService
    .build(
      this.datatableFilter$,
      (filter) => this.service.getDatatable(filter),
      'onDemand'
    )
    .setColumns(['Estado', 'Município'])
    .setActionButton({
      iconName: 'fa-solid fa-pencil',
      tooltip: 'Editar',
      fnAction: (itemLine) => console.log(itemLine),
    })
    .setActionButton({
      iconName: 'fa-solid fa-trash-can',
      tooltip: 'Excluir',
      fnAction: (itemLine) => console.log(itemLine),
    })
    .setItemLine({
      columnIndex: 0,
      sortColumn: 'uf',
      text: (itemLine) => itemLine.estado,
    })
    .setItemLine({
      columnIndex: 1,
      sortColumn: 'municipio',
      text: (itemLine) => itemLine.municipio,
    })
    .hasSelection()
    .hasActions()
    .getSelection((selection) => console.log(selection.selected))
    .getDatasource((datasource) => console.log(datasource))
    .generate();

  constructor(
    private filterService: CatOnDemandFilterService,
    private datatableService: CatDatatableService,
    private service: PageDatatableExampleService
  ) {
    super();
  }
}
