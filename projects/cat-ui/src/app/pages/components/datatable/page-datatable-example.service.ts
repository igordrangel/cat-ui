import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { first, map } from "rxjs";

@Injectable({providedIn: 'root'})
export class PageDatatableExampleService {
  constructor(private http: HttpClient) {
  }

  public getAll(filter: any) {
    console.log(filter);
    let endpoint = 'municipios';
    if (filter.uf) {
      endpoint = `estados/${filter.uf}/municipios`;
    }
    return this.http
               .get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/${endpoint}`)
               .pipe(
                 map(response => response.map(item => {
                   return {
                     estado: item['regiao-imediata']['regiao-intermediaria'].UF.nome,
                     municipio: item.nome
                   }
                 })),
                 first()
               );
  }
}
