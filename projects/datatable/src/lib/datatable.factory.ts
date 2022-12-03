import {
  DatatableActionButtonConfig,
  DatatableConfig,
  DatatableData, DatatableSelection,
  DatatableTypeDataList
} from "./cat-datatable.interface";
import { Observable } from "rxjs";

export class DatatableFactory<DataType> {
  private config: DatatableConfig<DataType> = {
    typeDataList: 'all',
    limitItemPerPage: 30
  } as DatatableConfig<DataType>;

  hasSelection(has = true) {
    this.config.hasSelection = has;
    return this;
  }

  hasActions(has = true) {
    this.config.hasAction = has;
    return this;
  }

  setActionButton(options: DatatableActionButtonConfig<DataType>) {
    if (!this.config.actionButtons) this.config.actionButtons = [];
    this.config.actionButtons.push(options);
    return this;
  }

  setColumns(columns: string[]) {
    this.config.columns = columns;
    return this;
  }

  setItemLine(options: DatatableData<DataType>) {
    if (!this.config.data) this.config.data = [];
    this.config.data.push(options);
    return this;
  }

  setService(service: (filter: any) => Observable<DataType[]>, options?: {
    listPropName?: string;
    listQtyPropName?: string;
    typeDataList?: DatatableTypeDataList;
  }) {
    this.config.service = service;

    if (options?.listPropName) this.config.listPropName = options.listPropName;
    if (options?.listQtyPropName) this.config.listQtyPropName = options.listQtyPropName;
    if (options?.typeDataList) this.config.typeDataList = options?.typeDataList;

    return this;
  }

  setFilter(filter$: Observable<any|string>) {
    this.config.filter$ = filter$;
    return this;
  }

  getSelection(getSelection: (selection: DatatableSelection<DataType>) => void) {
    this.config.getSelection = getSelection;
    return this;
  }

  getDatasource(getDatasource: (datasource: DataType[]) => void) {
    this.config.getDatasource = getDatasource;
    return this;
  }

  generate() {
    return this.config;
  }
}
