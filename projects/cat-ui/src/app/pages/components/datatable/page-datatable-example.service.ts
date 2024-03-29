import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatServiceBase } from '@catrx/ui/common';
import { CatDatatableDataHttpResponse } from '@catrx/ui/datatable';
import { map } from 'rxjs/internal/operators/map';
import { delay } from 'rxjs/internal/operators/delay';
import { first } from 'rxjs/internal/operators/first';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class PageDatatableExampleService extends CatServiceBase {
  constructor(http: HttpClient) {
    super(http, 'localidades', {
      customHost: 'https://servicodados.ibge.gov.br/api/v1',
    });
  }

  public override getAll(filter: any) {
    let endpoint = 'municipios';
    if (filter.uf) {
      endpoint = `estados/${filter.uf}/municipios`;
    }
    return this.httpClient
      .get<any[]>(`${this.host}/${this.mainResource}/${endpoint}`)
      .pipe(
        map((response) =>
          response
            .map((item) => {
              return {
                uf: item['regiao-imediata']['regiao-intermediaria'].UF.sigla,
                estado: item['regiao-imediata']['regiao-intermediaria'].UF.nome,
                municipio: item.nome as string,
              };
            })
            .filter((item) =>
              filter.municipio
                ? item.municipio.includes(filter.municipio)
                : true
            )
        ),
        delay(2000),
        first()
      );
  }

  public getDatatable(
    filter: any
  ): Observable<CatDatatableDataHttpResponse<any>> {
    return this.getAll(filter).pipe(
      map((response) => {
        return {
          count: response.length,
          items: response,
        };
      })
    );
  }
}
