import {
  DatatableActionButtonConfig,
  DatatableConfig,
  DatatableData,
  CatDatatableDataHttpResponse,
  CatDatatableSelection,
  DatatableTypeDataList,
} from './cat-datatable.interface';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

export class DatatableFactory<FilterType = any, DataType = any> {
  private config: DatatableConfig<DataType>;

  constructor(
    filter$: Subject<FilterType> | BehaviorSubject<FilterType>,
    service: (
      filter: FilterType
    ) => Observable<CatDatatableDataHttpResponse<DataType>>,
    loadType: DatatableTypeDataList = 'all'
  ) {
    this.config = {
      filter$: filter$,
      service,
      typeDataList: loadType,
      limitItemPerPage: 30,
      reloadList: new BehaviorSubject({ reload: false }),
    } as DatatableConfig<DataType>;
  }

  hasSelection(has = true) {
    this.config.hasSelection = has;
    return this;
  }

  hasActions(has = true) {
    this.config.hasAction = has;
    return this;
  }

  hidePaginator(hide = true) {
    this.config.hidePaginator = hide;
    return this;
  }

  hideMenuAndPaginator(hide = true) {
    this.config.hideMenuAndPaginator = hide;
    return this;
  }

  disableSelectionLineByRule(rule: (itemLine: DataType) => boolean) {
    this.config.disableSelectionItem = rule;
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

  setCustomEmptyComponent(component: CatDynamicComponent) {
    this.config.customEmptyComponent = component;
    return this;
  }

  setCustomLoaderComponent(component: CatDynamicComponent) {
    this.config.customLoaderComponent = component;
    return this;
  }

  getSelection(
    getSelection: (selection: CatDatatableSelection<DataType>) => void
  ) {
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
