import { FilterConfig, FilterOption } from "./filter-options.types";

export class FilterOptionsFactory {
  private config: FilterConfig = {
    options: []
  }

  public setOption(option: FilterOption) {
    this.config.options.push(option);
    return this;
  }

  public generate() {
    return this.config;
  }
}