import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatFormListOptions } from '@cat-ui/form';
import { delay, first, map } from 'rxjs/operators';

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
        delay(5000),
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
