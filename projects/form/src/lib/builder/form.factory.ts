import {
  CatFormBehavior,
  CatFormConfig,
  CatFormFieldOptions,
  CatFormInputType,
  CatFormTextareaOptions,
} from './form.interface';
import { FormFieldService } from './form-field.service';
import { Subject } from 'rxjs';
import { FormTextareaFactory } from './textarea/form-textarea.factory';
import { FormTextFactory } from './text/form-text.factory';
import { FormNumberFactory } from './number/form-number.factory';
import { FormDateFactory } from './date/form-date.factory';

export class FormFactory<DataType> {
  private readonly config: CatFormConfig<DataType>;

  constructor(private behavior?: Subject<CatFormBehavior>) {
    this.config = {
      behavior: this.behavior ?? new Subject(),
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
      config: config(new FormFactory<DataType>(this.config.behavior)),
    });
    return this;
  }

  public text(
    label: string,
    name: string,
    field: (builder: FormTextFactory) => CatFormFieldOptions
  ) {
    this.input('text', label, name, field);
    return this;
  }

  public number(
    label: string,
    name: string,
    field: (builder: FormNumberFactory) => CatFormFieldOptions
  ) {
    this.input('number', label, name, field);
    return this;
  }

  public date(
    label: string,
    name: string,
    field: (builder: FormDateFactory) => CatFormFieldOptions
  ) {
    this.input('date', label, name, field);
    return this;
  }

  public textarea(
    label: string,
    name: string,
    field: (builder: FormTextareaFactory) => CatFormTextareaOptions
  ) {
    this.input('textarea', label, name, field);
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

  private input(
    type: CatFormInputType,
    label: string,
    name: string,
    field: (builder: any) => CatFormFieldOptions
  ) {
    if (!this.config.fields) this.config.fields = [];

    this.config.fields.push({
      ...field(this.getFieldBuilder(label, type)),
      type,
      name,
      behavior: this.config.behavior,
    });
  }

  private getFieldBuilder(label: string, type: CatFormInputType) {
    const fieldService = new FormFieldService();

    switch (type) {
      case 'text':
        return fieldService.text(label);
      case 'number':
        return fieldService.number(label);
      case 'date':
        return fieldService.date(label);
      case 'textarea':
        return fieldService.textarea(label);
      default:
        throw new Error('Tipo de campo não suportado.');
    }
  }
}
