import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { FilterConfig, SelectedOptions } from "./filter-options.types";
import { CatFormService, FormFactory } from "@catrx/ui/form";

export class FilterOptionsFactory {
  constructor(private formService: CatFormService) { }

  private config: FilterConfig = {
    options: [],
    selectedOptions: new BehaviorSubject<SelectedOptions[]>([])
  }

  public setOption(builder: (fieldBuilder: FormFactory<any>) => FormFactory<any>, icon?: string) {
    this.config.options.push({
      icon,
      formBuilder: builder(this.formService.build())
    });
    return this;
  }

  public onChange(filter: (filter: SelectedOptions[]) => void) {
    this.config.onChange = filter;
    return this;
  }

  public generate() {
    return this.config;
  }
}