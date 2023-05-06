import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FilterConfig, SelectedOptions } from './filter-options.types';
import { CatFormService, FormFactory } from '@catrx/ui/form';
import { signal } from '@angular/core';

export class FilterOptionsFactory<PayloadType = any> {
  constructor(private formService: CatFormService) {}

  private config: FilterConfig<PayloadType> = {
    options: [],
    selectedOptions: new BehaviorSubject<SelectedOptions[]>([]),
    submit: signal(null)
  };

  public setOption(
    builder: (fieldBuilder: FormFactory<any>) => FormFactory<any>,
    icon?: string
  ) {
    this.config.options.push({
      icon,
      formBuilder: builder(this.formService.build()),
    });
    return this;
  }

  public autofill(data: any) {
    this.config.autofill = data;
    return this;
  }

  public onChange(filter: (filter: PayloadType) => void) {
    this.config.onChange = filter;
    return this;
  }

  public onSubmit(filter: (filter: PayloadType) => void) {
    this.config.onSubmit = filter;
    return this;
  }

  public generate() {
    return this.config;
  }
}
