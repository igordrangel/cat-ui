import { WritableSignal } from '@angular/core';
import { FormFactory } from '@catrx/ui/form';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface FilterConfig<PayloadType = any> {
  autofill?: any;
  options: FilterOption[];
  selectedOptions: BehaviorSubject<SelectedOptions[]>;
  onChange?: (filter: PayloadType) => void;
  onSubmit?: (filter: PayloadType) => void;
  submit: WritableSignal<() => void | null>;
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
