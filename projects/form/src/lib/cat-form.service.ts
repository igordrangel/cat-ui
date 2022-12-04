import { Injectable } from '@angular/core';
import { FormFactory } from "./builder/form.factory";

@Injectable({
  providedIn: 'root'
})
export class CatFormService {

  build<DataType>() {
    return new FormFactory<DataType>();
  }
}
