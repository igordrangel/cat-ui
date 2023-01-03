import { Injectable } from '@angular/core';
import { FormFactory } from "./builder/form.factory";

@Injectable({
  providedIn: 'root',
})
export class CatFormService {
  build<DataType>(data?: DataType) {
    return new FormFactory<DataType>(data);
  }
}
