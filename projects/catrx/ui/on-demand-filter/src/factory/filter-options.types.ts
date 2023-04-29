import { FormFactory } from "@catrx/ui/form";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export interface FilterConfig<PayloadType = any> {
  options: FilterOption[];
  selectedOptions: BehaviorSubject<SelectedOptions[]>;
  onChange?: (filter: PayloadType) => void;
}

export interface FilterOption {
  icon?: string;
  formBuilder: FormFactory<any>;
}

export interface SelectedOptions {
  icon?: string;
  label: string;
  name: string;
  previewValue: string;
  value: any;
}