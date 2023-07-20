import { Type } from '@angular/core';
import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { CatFormBehavior } from '../common/cat-form-behavior';
import { CatFormCustomField } from '../common/cat-form-custom-field';
import { CatSelectOption } from '../common/cat-select-option';
import { CatFileInterface } from '@catrx/ui/utils';

export interface CatFormConfig<DataType> {
  formElements: CatFormElementConfig[];
  onSubmit?: (data: DataType) => Observable<any>;
  onChange?: (data: DataType) => void;
  isCheckboxGroup?: boolean;
  grid?: CatFormFieldTemplateGridType;
  hidden?: boolean;
  behavior: CatFormBehavior;
  autofill?: DataType;
}

export interface CatFormElementConfig {
  fieldset?: CatFormFieldsetConfig;
  listItem?: CatFormListItemConfig;
  field?: CatFormFieldConfig;
}

export interface CatFormFieldConfig extends CatFormFieldOptions {
  type: CatFormFieldType;
  name: string;
  behavior: CatFormBehavior;
}

export interface CatFormFieldOptions {
  label: string;
  placeholder?: string;
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

export interface CatFormTextMaskConfig {
  prefix?: string;
  sufix?: string;
  dropSpecialCharacters?: boolean;
  showMaskTyped?: boolean;
  allowNegativeNumbers?: boolean;
  placeHolderCharacter?: string;
  thousandSeparator?: string;
  decimalMarker?: ',' | '.';
  leadZero?: boolean;
  separatorLimit?: string;
  hiddenInput?: boolean;
  mask: string;
}

export interface CatFormTextOptions extends CatFormFieldOptions {
  mask?: CatFormTextMaskConfig;
}
export type CatFormPasswordOptions = CatFormFieldOptions;
export interface CatFormTextareaOptions extends CatFormFieldOptions {
  minRows?: number;
  maxRows?: number;
}
export interface CatFormNumberOptions extends CatFormFieldOptions {
  min?: number;
  max?: number;
}
export interface CatFormRangeOptions extends CatFormNumberOptions {
  range?: number;
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
export interface CatFormCustomSelectedFileList<DataType = CatFileInterface[]> {
  data: DataType;
  remove: (index: number) => void;
}
export interface CatFormFileOptions extends CatFormFieldOptions {
  icon?: string;
  btnText?: string;
  multiple?: boolean;
  accept?: string[];
  hideSelectedFilesList?: boolean;
  customSelectedFilesList?: Type<any>;
}
export interface CatFormCsvOptions extends CatFormFileOptions {
  csvModel: CatCsvModel;
}
export type CatFormCheckboxOptions = CatFormFieldOptions;
export interface CatFormRadioOptions extends CatFormFieldOptions {
  options?: Array<CatFormListOptions>;
}

export interface CatFormListOptions<OptionName = string | CatSelectOption> {
  name: OptionName;
  value: any;
}

export interface CatFormCustomFieldOptions<PropsType = any>
  extends CatFormFieldOptions {
  fieldComponent?: CatFormCustomField<PropsType>;
  fieldProps?: PropsType;
  control$?: BehaviorSubject<FormControl>;
}

export interface CatFormFieldsetConfig {
  legend: string;
  name: string;
  config?: CatFormConfig<any>;
}

export interface CatFormListItemConfig {
  legend: string;
  name: string;
  config?: CatFormConfig<any>;
  options?: CatFormItemListOptions;
}
export interface CatFormItemListOptions {
  minItems?: number;
  maxItems?: number;
  hidden?: boolean;
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
  | 'range'
  | 'number'
  | 'email'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'url'
  | 'textarea'
  | 'cpf'
  | 'cnpj'
  | 'switcher'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'csv'
  | 'select'
  | 'autocomplete'
  | 'customField';
