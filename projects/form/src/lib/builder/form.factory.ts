import { CatFormConfig, CatFormFieldOptions, CatFormInputType } from "./form.interface";
import { FormFieldService } from "./form-field.service";
import { CatFormService } from "@cat-ui/form";

export class FormFactory<DataType> {
  private config: CatFormConfig<DataType> = {} as CatFormConfig<DataType>;

  public fieldset(legend: string, config: (builder: CatFormService) => CatFormConfig<DataType>) {
    if (!this.config.fieldset) this.config.fieldset = [];
    this.config.fieldset.push({
      legend,
      config: config(new CatFormService())
    })
    return this;
  }

  public inputText(name: string, field: (builder: FormFieldService) => CatFormFieldOptions) {
    this.input('text', name, field);
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

  private input(type: CatFormInputType, name: string, field: (builder: FormFieldService) => CatFormFieldOptions) {
    if (!this.config.fields) this.config.fields = [];
    this.config.fields.push({
      ...field(new FormFieldService()),
      type,
      name
    });
  }
}
