import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageFormService {
  constructor(private http: HttpClient) {}

  public getAddressByZipCode(zipcode: string) {
    return this.http
      .get<any>(`https://viacep.com.br/ws/${zipcode}/json`)
      .pipe(first());
  }
}
