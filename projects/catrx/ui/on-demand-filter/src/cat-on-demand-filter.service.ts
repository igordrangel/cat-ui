import { Injectable } from "@angular/core";
import { FilterOptionsFactory } from "./factory/filter-options.factory";

@Injectable({ providedIn: 'root' })
export class CatOnDemandFilterService {
  public build() {
    return new FilterOptionsFactory();
  }
}