import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

export interface CatFormConfig<DataType> {
  fieldset: CatFormFieldsetConfig[];
  fields?: CatFormFieldConfig[];
  onSubmit?: (data: DataType) => void;
  onChange?: (data: DataType) => void;
}

export interface CatFormFieldConfig extends CatFormFieldOptions {
  type: CatFormInputType | CatFormFileType | CatFormSelectType | CatFormCheckType;
  name: string;
}

export interface CatFormFieldOptions {
  label: string;
  value?: string;
  focus?: boolean;
  disabled?: boolean;
  grid?: CatFormFieldTemplateGridType;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
}

export interface CatFormInputOptions extends CatFormFieldOptions {}
export interface CatFormSelectOptions extends CatFormFieldOptions {
  options: Array<any> | Observable<any[]>;
}
export interface CatFormFileOptions extends CatFormFieldOptions {}
export interface CatFormCheckOptions extends CatFormFieldOptions {}

export interface CatFormFieldsetConfig {
  legend: string;
  config?: CatFormConfig<any>;
}

export type CatFormFieldTemplateGridType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type CatFormInputType = 'text' | 'number' | 'email' | 'date' | 'datetime' | 'time' | 'phone' | 'textarea' | 'cpf' | 'cnpj';
export type CatFormFileType = 'file' | 'csv';
export type CatFormSelectType = 'autocomplete' | 'select' | 'map';
export type CatFormCheckType = 'checkbox' | 'radio';
