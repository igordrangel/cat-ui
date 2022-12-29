import { Component } from "@angular/core";
import { CatDatatableService } from "@catrx/ui/datatable";
import { PageDatatableExampleService } from "./page-datatable-example.service";

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
               .setActionButton({
                 iconName: 'fa-solid fa-pencil',
                 tooltip: 'Editar',
                 fnAction: itemLine => console.log(itemLine)
               })
               .setActionButton({
                 iconName: 'fa-solid fa-trash-can',
                 tooltip: 'Excluir',
                 fnAction: itemLine => console.log(itemLine)
               })
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
               .hasActions()
               .getSelection(selection => console.log(selection.selected))
               .getDatasource(datasource => console.log(datasource))
               .generate();

  constructor(
    private datatableService: CatDatatableService,
    private service: PageDatatableExampleService) {
    document.title = 'Datatable Example'
  }
}
