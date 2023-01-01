import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { CatFormBehavior } from '../common/cat-form-behavior';
import { Type } from '@angular/core';

export interface CatFormConfig<DataType> {
  fieldset?: CatFormFieldsetConfig[];
  fields?: CatFormFieldConfig[];
  onSubmit?: (data: DataType) => void;
  onChange?: (data: DataType) => void;
  isCheckboxGroup?: boolean;
  grid?: CatFormFieldTemplateGridType;
  behavior: CatFormBehavior;
  autofill?: DataType;
}

export interface CatFormFieldConfig extends CatFormFieldOptions {
  type: CatFormFieldType;
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

export interface CatFormTextOptions extends CatFormFieldOptions {
  mask?: string;
}
export interface CatFormPasswordOptions extends CatFormFieldOptions {}
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
  options?: Observable<CatFormListOptions[]>;
  multiple?: boolean;
}
export interface CatFormAutocompleteOptions extends CatFormFieldOptions {
  options?:
    | ((filter?: any) => Observable<CatFormListOptions[]>)
    | Observable<CatFormListOptions[]>;
  multiple?: boolean;
  add?: boolean;
  addOption?: CatFormAutocompleteAddOption;
}
export interface CatFormAutocompleteAddOption {
  persistService?: (value: string) => Observable<CatFormListOptions>;
  customTemplate?: Type<any>;
}
export interface CatFormFileOptions extends CatFormFieldOptions {
  icon?: string;
  btnText?: string;
  multiple?: boolean;
  accept?: string[];
}
export interface CatFormCsvOptions extends CatFormFileOptions {
  csvModel: CatCsvModel;
}
export interface CatFormCheckboxOptions extends CatFormFieldOptions {}
export interface CatFormRadioOptions extends CatFormFieldOptions {
  options?: Array<CatFormListOptions>;
}

export interface CatFormListOptions {
  name: string;
  value: any;
}

export interface CatFormFieldsetConfig {
  legend: string;
  name: string;
  config?: CatFormConfig<any>;
}

export interface CatCsvModel {
  filename: string;
  model: { [key: string]: '' };
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
export type CatFormFieldType =
  | 'text'
  | 'search'
  | 'password'
  | 'number'
  | 'email'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'url'
  | 'textarea'
  | 'cpf'
  | 'cnpj'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'csv'
  | 'select'
  | 'autocomplete';
