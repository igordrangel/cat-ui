import { Injectable } from '@angular/core';
import { FilterOptionsFactory } from './factory/filter-options.factory';
import { CatFormService } from '@catrx/ui/form';

@Injectable({ providedIn: 'root' })
export class CatOnDemandFilterService {
  constructor(private formService: CatFormService) {}

  public build() {
    return new FilterOptionsFactory(this.formService);
  }
}
