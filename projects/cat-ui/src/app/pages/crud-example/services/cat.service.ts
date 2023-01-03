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
      mockupStartBase: [
        {
          id: 1,
          race: 'Frajola',
          sex: 'M',
          photo:
            'https://static1.patasdacasa.com.br/articles/7/49/77/@/20775-o-gato-preto-e-branco-tem-um-charme-que-articles_media_mobile-2.jpg',
        },
      ],
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
