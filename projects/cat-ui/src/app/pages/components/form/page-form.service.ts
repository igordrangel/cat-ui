import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatFormListOptions } from '@catrx/ui/form';
import { delay } from 'rxjs/internal/operators/delay';
import { first } from 'rxjs/internal/operators/first';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class PageFormService {
  constructor(private http: HttpClient) {}

  public getAddressByZipCode(zipcode: string) {
    return this.http
      .get<any>(`https://viacep.com.br/ws/${zipcode}/json`)
      .pipe(first());
  }

  public getUFs() {
    return this.http
      .get<any[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados`,
        {
          params: { orderBy: 'nome' },
        }
      )
      .pipe(
        delay(2000),
        map((ufs) =>
          ufs.map((uf) => {
            return {
              value: uf.sigla,
              name: uf.sigla,
            } as CatFormListOptions;
          })
        ),
        first()
      );
  }
}
