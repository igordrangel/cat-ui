import { FormCpfFactory } from './cpf/form-cpf.factory';
import {
  CatFormConfig,
  CatFormFieldOptions,
  CatFormFieldTemplateGridType,
  CatFormFieldType,
  CatFormTextareaOptions
} from './form.interface';
import { FormFieldService } from './form-field.service';
import { Subject } from 'rxjs';
import { FormTextareaFactory } from './textarea/form-textarea.factory';
import { FormTextFactory } from './text/form-text.factory';
import { FormNumberFactory } from './number/form-number.factory';
import { FormDatetimeFactory } from './datetime/form-datetime.factory';
import { FormCnpjFactory } from './cnpj/form-cnpj.factory';
import { CatFormBehavior } from '../common/cat-form-behavior';
import { FormCheckboxFactory } from './checkbox/form-checkbox.factory';
import { FormRadioFactory } from './radio/form-radio.factory';
import { FormFileFactory } from './file/form-file.factory';

export class FormFactory<DataType> {
  private readonly config: CatFormConfig<DataType>;

  constructor(private behavior?: CatFormBehavior) {
    this.config = {
      behavior: this.behavior ?? new CatFormBehavior(new Subject())
    } as CatFormConfig<DataType>;
  }

  public fieldset(
    legend: string,
    name: string,
    config: (builder: FormFactory<DataType>) => CatFormConfig<DataType>
  ) {
    if (!this.config.fieldset) this.config.fieldset = [];
    this.config.fieldset.push({
      legend,
      name,
      config: config(new FormFactory<DataType>(this.config.behavior))
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
    label: string,
    name: string,
    field: (builder: FormFileFactory) => CatFormFieldOptions
  ) {
    this.field('file', label, name, field);
    return this;
  }

  public onChange(callback: (data: DataType) => void) {
    this.config.onChange = callback;
    return this;
  }

  public onSubmit(callback: (data: DataType) => void) {
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
    if (!this.config.fields) this.config.fields = [];

    this.config.fields.push({
      ...field(this.getFieldBuilder(label, type)),
      type,
      name,
      behavior: this.config.behavior
    });
  }

  private getFieldBuilder(label: string, type: CatFormFieldType) {
    const fieldService = new FormFieldService();

    switch (type) {
      case 'text':
        return fieldService.text(label);
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
      default:
        throw new Error('Tipo de campo não suportado.');
    }
  }
}
