import { Component } from '@angular/core';
import { CatDatatableService } from '@catrx/ui/datatable';
import { CatFormService } from '@catrx/ui/form';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PageDatatableExampleService } from './page-datatable-example.service';

@Component({
  templateUrl: 'page-datatable-example.component.html',
  styles: [
    `
      cat-form {
        display: block;
        margin: 20px 20px 15px;
      }
    `,
  ],
})
export class PageDatatableExampleComponent {
  datatableFilter$ = new BehaviorSubject(null);
  filterConfig = this.formService
    .build<any>()
    .search('Buscar', 'filter', (builder) => builder.grid(3).generate())
    .onChange((data) => this.datatableFilter$.next(data?.filter))
    .generate();

  datatableConfig = this.datatableService
    .build(this.datatableFilter$, (filter) => this.service.getDatatable(filter))
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
      sortColumn: 'estado',
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
    private formService: CatFormService,
    private datatableService: CatDatatableService,
    private service: PageDatatableExampleService
  ) {}
}
