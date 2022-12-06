import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { Observable, Subject } from "rxjs";

export interface CatFormConfig<DataType> {
  fieldset?: CatFormFieldsetConfig[];
  fields?: CatFormFieldConfig[];
  onSubmit?: (data: DataType) => void;
  onChange?: (data: DataType) => void;
  behavior: Subject<CatFormBehavior>;
}

export interface CatFormFieldConfig extends CatFormFieldOptions {
  type: CatFormInputType | CatFormFileType | CatFormSelectType | CatFormCheckType;
  name: string;
  behavior: Subject<CatFormBehavior>;
}

export interface CatFormFieldOptions {
  label: string;
  value?: string;
  focus?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  grid?: CatFormFieldTemplateGridType;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
  onChange?: (value: any, behavior: Subject<CatFormBehavior>) => void;
}

export interface CatFormBehavior {
  disableFields?: string[];
  enableFields?: string[];
  showFields?: string[];
  hideFields?: string[];
  replaceValidators?: CatFormBehaviorValidator[];
  replaceAsyncValidators?: CatFormBehaviorAsyncValidator[];
}
export interface CatFormBehaviorValidator {
  name: string;
  validators: ValidatorFn[];
}
export interface CatFormBehaviorAsyncValidator {
  name: string;
  asyncValidators: AsyncValidatorFn[];
}

export interface CatFormInputOptions extends CatFormFieldOptions {}
export interface CatFormSelectOptions extends CatFormFieldOptions {
  options: Array<any> | Observable<any[]>;
}
export interface CatFormFileOptions extends CatFormFieldOptions {}
export interface CatFormCheckOptions extends CatFormFieldOptions {}

export interface CatFormFieldsetConfig {
  legend: string;
  name: string;
  config?: CatFormConfig<any>;
}

export type CatFormFieldTemplateGridType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type CatFormInputType = 'text' | 'number' | 'email' | 'date' | 'datetime' | 'time' | 'phone' | 'textarea' | 'cpf' | 'cnpj';
export type CatFormFileType = 'file' | 'csv';
export type CatFormSelectType = 'autocomplete' | 'select' | 'map';
export type CatFormCheckType = 'checkbox' | 'radio';
