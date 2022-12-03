import { Component } from "@angular/core";
import { CatDatatableService } from "@cat-ui/datatable";
import { PageDatatableExampleService } from "./page-datatable-example.service";
import { Observable } from "rxjs";

@Component({
  templateUrl: 'page-datatable-example.component.html'
})
export class PageDatatableExampleComponent {
  config = this.datatableService
               .build<any>()
               .setColumns([
                 'Estado',
                 'Município'
               ])
               .setItemLine({
                 columnIndex: 0,
                 sortColumn: 'estado',
                 text: itemLine => itemLine.estado
               })
               .setItemLine({
                 columnIndex: 1,
                 sortColumn: 'municipio',
                 text: itemLine => itemLine.municipio
               })
               .setService(filter => this.service.getAll(filter), {typeDataList: "onDemand"})
               .hasSelection()
               .generate();

  constructor(
    private datatableService: CatDatatableService,
    private service: PageDatatableExampleService
  ) {
  }
}
