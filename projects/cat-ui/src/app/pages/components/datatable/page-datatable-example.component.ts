import { Component } from "@angular/core";
import { Route, Router } from '@angular/router';
import { CatBaseComponent } from "@catrx/ui/core";
import { CatDatatableService } from "@catrx/ui/datatable";
import { CatFormService } from "@catrx/ui/form";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { PageDatatableExampleService } from "./page-datatable-example.service";

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
export class PageDatatableExampleComponent extends CatBaseComponent {
  datatableFilter$ = new BehaviorSubject(null);
  filterConfig = this.formService
    .build<any>()
    .search('Buscar', 'filter', (builder) => builder.grid(3).generate())
    .onChange((data) => this.datatableFilter$.next(data?.filter))
    .generate();

  datatableConfig = this.datatableService
    .build<any>()
    .setColumns(['Estado', 'Município'])
    .setFilter(this.datatableFilter$)
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
    .setService((filter) => this.service.getAll(filter))
    .hasSelection()
    .hasActions()
    .getSelection((selection) => console.log(selection.selected))
    .getDatasource((datasource) => console.log(datasource))
    .generate();

  constructor(
    private router: Router,
    private formService: CatFormService,
    private datatableService: CatDatatableService,
    private service: PageDatatableExampleService
  ) {
    super();
  }
}
