import { BehaviorSubject, Observable } from "rxjs";
import { CatDynamicComponent } from "@cat-ui/dynamic-component";
import { CatIconButtonColor } from "@cat-ui/icon-button";

export interface DatatableConfig<DataType> {
  filter$?: Observable<any|string>;
  customFilter?: boolean;
  hasSelection?: boolean;
  hasAction?: boolean;
  columns: string[];
  data: DatatableData<DataType>[];
  actionButtons: DatatableActionButtonConfig<DataType>[];
  service: (filter: DatatableFilterResponse) => Observable<DataType[]>;
  typeDataList: DatatableTypeDataList;
  listPropName?: string;
  listQtyPropName?: string;
  limitItemPerPage: 10|30|50|100;
  defaultColumSortIndex?: number;
  defaultColumOrder?: ColumOrderType;
  reloadList: BehaviorSubject<boolean | {reload: boolean;preservePagination: boolean;}>;
  getDatasource?: (datasource: DataType[]) => void;
  getCurrentFilter?: (currentFilter: any) => void;
  getSelection?: (selection: DatatableSelection<DataType>) => void;
  disableSelectionItem?: (item: DataType) => boolean;
  hideCheckAll?: boolean;
  autoSearch?: boolean;
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

export interface DatatableSelection<T> {
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

export type ColumOrderType = 'asc' | 'desc';
export type DatatableTypeDataList = 'all' | 'onDemand';
