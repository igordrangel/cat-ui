import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import {
  CatDatatableDataHttpResponse,
  DatatableTypeDataList,
} from './cat-datatable.interface';
import { DatatableFactory } from './datatable.factory';

@Injectable({
  providedIn: 'root',
})
export class CatDatatableService {
  public build<FilterType, ListType>(
    filter: Subject<FilterType> | BehaviorSubject<FilterType>,
    service: (
      filter: FilterType
    ) => Observable<CatDatatableDataHttpResponse<ListType>>,
    loadType: DatatableTypeDataList = 'all'
  ) {
    return new DatatableFactory(filter, service, loadType);
  }
}
