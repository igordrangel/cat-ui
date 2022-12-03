import { Injectable } from '@angular/core';
import { DatatableFactory } from "./datatable.factory";

@Injectable({
  providedIn: 'root'
})
export class CatDatatableService {

  public build<DataType>() {
    return new DatatableFactory<DataType>();
  }
}
