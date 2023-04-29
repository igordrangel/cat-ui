import { FormFactory } from "@catrx/ui/form";

export interface FilterConfig {
  options: FilterOption[];
}

export interface FilterOption<FormDataType = any> {
  icon?: string;
  name: string;
  formConfig: FormFactory<FormDataType>;
}