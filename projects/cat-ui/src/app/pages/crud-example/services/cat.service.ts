import { Injectable } from "@angular/core";
import { CatServiceBase } from "@catrx/ui/common";
import { HttpClient } from '@angular/common/http';
import { Cat, CatFilter } from "./cat.interface";
import { CatDatatableDataHttpResponse } from "@catrx/ui/datatable";
import { map } from "rxjs/internal/operators/map";
import { Observable } from "rxjs/internal/Observable";

@Injectable({ providedIn: 'root' })
export class CatService extends CatServiceBase<CatFilter, Array<Cat>, Cat> {
  constructor(http: HttpClient) {
    super(http, 'cat', {
      useMockup: true,
    });
  }

  public getDatatable(filter?: CatFilter): Observable<CatDatatableDataHttpResponse<Cat>> {
    return this.getAll(filter).pipe(map(response => {
      return {
        count: response.length,
        items: response
      };
    }))
  }
}
