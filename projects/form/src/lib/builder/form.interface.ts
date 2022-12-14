import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { CatFormBehavior } from '../common/cat-form-behavior';

export interface CatFormConfig<DataType> {
  fieldset?: CatFormFieldsetConfig[];
  fields?: CatFormFieldConfig[];
  onSubmit?: (data: DataType) => void;
  onChange?: (data: DataType) => void;
  behavior: CatFormBehavior;
}

export interface CatFormFieldConfig extends CatFormFieldOptions {
  type:
    | CatFormInputType
    | CatFormFileType
    | CatFormSelectType
    | CatFormCheckType;
  name: string;
  behavior: CatFormBehavior;
}

export interface CatFormFieldOptions {
  label: string;
  value?: string;
  hint?: string;
  focus?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  grid?: CatFormFieldTemplateGridType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
  onChange?: (value: any, behavior: CatFormBehavior) => void;
}

export interface CatFormBehaviorOptions {
  enableFields?: string[];
  disableFields?: string[];
  showFields?: string[];
  hideFields?: string[];
  replaceValidators?: CatFormBehaviorValidator[];
  replaceAsyncValidators?: CatFormBehaviorAsyncValidator[];
  setValues?: CatFormBehaviorSetValue[];
}
export interface CatFormBehaviorSetValue {
  name: string;
  value: any;
}
export interface CatFormBehaviorValidator {
  name: string;
  validators: ValidatorFn[];
}
export interface CatFormBehaviorAsyncValidator {
  name: string;
  asyncValidators: AsyncValidatorFn[];
}

export interface CatFormTextOptions extends CatFormFieldOptions {}
export interface CatFormTextareaOptions extends CatFormFieldOptions {
  minRows?: number;
  maxRows?: number;
}
export interface CatFormNumberOptions extends CatFormFieldOptions {
  min?: number;
  max?: number;
}
export interface CatFormDatetimeOptions extends CatFormFieldOptions {
  min?: string;
  max?: string;
}
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

export type CatFormFieldTemplateGridType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;
export type CatFormInputType =
  | 'text'
  | 'number'
  | 'email'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'url'
  | 'textarea'
  | 'cpf'
  | 'cnpj';
export type CatFormFileType = 'file' | 'csv';
export type CatFormSelectType = 'autocomplete' | 'select' | 'map';
export type CatFormCheckType = 'checkbox' | 'radio';
