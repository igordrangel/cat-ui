import { CatDynamicComponent } from "@catrx/ui/dynamic-component";
import { CatIconButtonColor } from "@catrx/ui/icon-button";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";

export interface DatatableConfig<DataType> {
  filter$?: BehaviorSubject<any | string>;
  hasSelection?: boolean;
  hasAction?: boolean;
  columns: string[];
  data: DatatableData<DataType>[];
  actionButtons: DatatableActionButtonConfig<DataType>[];
  service: <ListType>(
    filter: any
  ) => Observable<CatDatatableDataHttpResponse<ListType>>;
  typeDataList: DatatableTypeDataList;
  limitItemPerPage: 10 | 30 | 50 | 100;
  defaultColumSortIndex?: number;
  defaultColumOrder?: ColumOrderType;
  reloadList: BehaviorSubject<{ reload: boolean; preservePagination: boolean }>;
  getDatasource?: (datasource: DataType[]) => void;
  getCurrentFilter?: (currentFilter: any) => void;
  getSelection?: (selection: CatDatatableSelection<DataType>) => void;
  disableSelectionItem?: (item: DataType) => boolean;
  customEmptyComponent?: CatDynamicComponent;
  customLoaderComponent?: CatDynamicComponent;
}

export interface DatatableFilterResponse {
  [key: string]: any;
  page: number;
  orderBy: string;
  direction: ColumOrderType;
}

export interface DatatableSelectedItem<T> {
  index: number;
  item: T;
}

export interface CatDatatableSelection<T> {
  selected: DatatableSelectedItem<T>[];
  lastSelected: DatatableSelectedItem<T> | null;
  data: T[];
  emit: boolean;
  checkAll: boolean;
}

export interface DatatableActionButtonConfig<DataType> {
  iconColor?: CatIconButtonColor;
  iconName: string;
  fnAction?: (itemLine: DataType) => void;
  havePermission?: boolean;
  tooltip?: string;
  showBtn?: (itemLine: DataType) => boolean;
}

export interface DatatableData<DataType> {
  columnIndex: number;
  sortColumn?: string;
  text?: (itemLine: DataType) => string;
  component?: (itemLine: DataType) => CatDynamicComponent;
}

export interface CatDatatableDataHttpResponse<ListType> {
  count: number;
  items: ListType[];
}

export type ColumOrderType = 'asc' | 'desc';
export type DatatableTypeDataList = 'all' | 'onDemand';
