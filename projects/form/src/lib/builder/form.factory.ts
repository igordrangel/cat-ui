import { FormSelectFactory } from './select/form-select.factory';
import { FormCpfFactory } from './cpf/form-cpf.factory';
import {
  CatFormConfig,
  CatFormFieldOptions,
  CatFormFieldTemplateGridType,
  CatFormFieldType,
  CatFormItemListOptions,
  CatFormTextareaOptions
} from './form.interface';
import { FormFieldService } from './form-field.service';
import { Subject, Observable } from 'rxjs';
import { FormTextareaFactory } from './textarea/form-textarea.factory';
import { FormTextFactory } from './text/form-text.factory';
import { FormNumberFactory } from './number/form-number.factory';
import { FormDatetimeFactory } from './datetime/form-datetime.factory';
import { FormCnpjFactory } from './cnpj/form-cnpj.factory';
import { CatFormBehavior } from '../common/cat-form-behavior';
import { FormCheckboxFactory } from './checkbox/form-checkbox.factory';
import { FormRadioFactory } from './radio/form-radio.factory';
import { FormFileFactory } from './file/form-file.factory';
import { FormCsvFactory } from './csv/form-csv.factory';
import { FormAutocompleteFactory } from './autocomplete/form-autocomplete.factory';
import { FormPasswordFactory } from './password/form-password.factory';
import { FormSearchFactory } from './search/form-search.factory';

export class FormFactory<DataType> {
  private readonly config: CatFormConfig<DataType>;

  constructor(private data?: DataType, private behavior?: CatFormBehavior) {
    this.config = {
      behavior: this.behavior ?? new CatFormBehavior(new Subject()),
      autofill: data,
    } as CatFormConfig<DataType>;
  }

  public fieldset(
    legend: string,
    name: string,
    config: (builder: FormFactory<DataType>) => CatFormConfig<DataType>
  ) {
    if (!this.config.formElements) this.config.formElements = [];
    this.config.formElements.push({
      fieldset: {
        legend,
        name,
        config: config(
          new FormFactory<DataType>(this.data?.[name], this.config.behavior)
        ),
      },
    });
    return this;
  }

  public listsItem(
    legend: string,
    name: string,
    config: (builder: FormFactory<DataType>) => CatFormConfig<DataType>,
    options?: CatFormItemListOptions
  ) {
    if (!this.config.formElements) this.config.formElements = [];
    this.config.formElements.push({
      listItem: {
        legend,
        name,
        config: config(
          new FormFactory<DataType>(this.data, this.config.behavior)
        ),
        options,
      },
    });
    return this;
  }

  public isCheckboxGroup(isCheckboxGroup = true) {
    this.config.isCheckboxGroup = isCheckboxGroup;
    return this;
  }

  public grid(grid: CatFormFieldTemplateGridType) {
    this.config.grid = grid;
    return this;
  }

  public text(
    label: string,
    name: string,
    field: (builder: FormTextFactory) => CatFormFieldOptions
  ) {
    this.field('text', label, name, field);
    return this;
  }

  public search(
    label: string,
    name: string,
    field: (builder: FormSearchFactory) => CatFormFieldOptions
  ) {
    this.field('search', label, name, field);
    return this;
  }

  public password(
    label: string,
    name: string,
    field: (builder: FormPasswordFactory) => CatFormFieldOptions
  ) {
    this.field('password', label, name, field);
    return this;
  }

  public email(
    label: string,
    name: string,
    field: (builder: FormTextFactory) => CatFormFieldOptions
  ) {
    this.field('email', label, name, field);
    return this;
  }

  public url(
    label: string,
    name: string,
    field: (builder: FormTextFactory) => CatFormFieldOptions
  ) {
    this.field('url', label, name, field);
    return this;
  }

  public number(
    label: string,
    name: string,
    field: (builder: FormNumberFactory) => CatFormFieldOptions
  ) {
    this.field('number', label, name, field);
    return this;
  }

  public date(
    label: string,
    name: string,
    field: (builder: FormDatetimeFactory) => CatFormFieldOptions
  ) {
    this.field('date', label, name, field);
    return this;
  }

  public time(
    label: string,
    name: string,
    field: (builder: FormDatetimeFactory) => CatFormFieldOptions
  ) {
    this.field('time', label, name, field);
    return this;
  }

  public datetime(
    label: string,
    name: string,
    field: (builder: FormDatetimeFactory) => CatFormFieldOptions
  ) {
    this.field('datetime-local', label, name, field);
    return this;
  }

  public textarea(
    label: string,
    name: string,
    field: (builder: FormTextareaFactory) => CatFormTextareaOptions
  ) {
    this.field('textarea', label, name, field);
    return this;
  }

  public cpf(
    label: string,
    name: string,
    field: (builder: FormCpfFactory) => CatFormFieldOptions
  ) {
    this.field('cpf', label, name, field);
    return this;
  }

  public cnpj(
    label: string,
    name: string,
    field: (builder: FormCnpjFactory) => CatFormFieldOptions
  ) {
    this.field('cnpj', label, name, field);
    return this;
  }

  public checkbox(
    label: string,
    name: string,
    field: (builder: FormCheckboxFactory) => CatFormFieldOptions
  ) {
    this.field('checkbox', label, name, field);
    return this;
  }

  public radio(
    name: string,
    field: (builder: FormRadioFactory) => CatFormFieldOptions
  ) {
    this.field('radio', '', name, field);
    return this;
  }

  public file(
    name: string,
    field: (builder: FormFileFactory) => CatFormFieldOptions
  ) {
    this.field('file', '', name, field);
    return this;
  }

  public csv(
    name: string,
    field: (builder: FormCsvFactory) => CatFormFieldOptions
  ) {
    this.field('csv', '', name, field);
    return this;
  }

  public select(
    label: string,
    name: string,
    field: (builder: FormSelectFactory) => CatFormFieldOptions
  ) {
    this.field('select', label, name, field);
    return this;
  }

  public autocomplete(
    label: string,
    name: string,
    field: (builder: FormAutocompleteFactory) => CatFormFieldOptions
  ) {
    this.field('autocomplete', label, name, field);
    return this;
  }

  public onChange(callback: (data: DataType) => void) {
    this.config.onChange = callback;
    return this;
  }

  public onSubmit(callback: (data: DataType) => Observable<any>) {
    this.config.onSubmit = callback;
    return this;
  }

  public generate() {
    return this.config;
  }

  private field(
    type: CatFormFieldType,
    label: string,
    name: string,
    field: (builder: any) => CatFormFieldOptions
  ) {
    if (!this.config.formElements) this.config.formElements = [];
    this.config.formElements.push({
      field: {
        ...field(this.getFieldBuilder(label, type)),
        type,
        name,
        behavior: this.config.behavior,
      },
    });
  }

  private getFieldBuilder(label: string, type: CatFormFieldType) {
    const fieldService = new FormFieldService();

    switch (type) {
      case 'text':
        return fieldService.text(label);
      case 'search':
        return fieldService.search(label);
      case 'password':
        return fieldService.password(label);
      case 'email':
        return fieldService.email(label);
      case 'url':
        return fieldService.url(label);
      case 'number':
        return fieldService.number(label);
      case 'date':
      case 'datetime-local':
      case 'time':
        return fieldService.date(label);
      case 'textarea':
        return fieldService.textarea(label);
      case 'cpf':
        return fieldService.cpf(label);
      case 'cnpj':
        return fieldService.cnpj(label);
      case 'checkbox':
        return fieldService.checkbox(label);
      case 'radio':
        return fieldService.radio(label);
      case 'file':
        return fieldService.file(label);
      case 'csv':
        return fieldService.csv(label);
      case 'select':
        return fieldService.select(label);
      case 'autocomplete':
        return fieldService.autocomplete(label);
      default:
        throw new Error('Tipo de campo não suportado.');
    }
  }
}
