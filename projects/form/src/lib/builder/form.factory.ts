import { CatFormBehavior, CatFormConfig, CatFormFieldOptions, CatFormInputType } from "./form.interface";
import { FormFieldService } from "./form-field.service";
import { Subject } from "rxjs";

export class FormFactory<DataType> {
  private readonly config: CatFormConfig<DataType>;

  constructor(private behavior?: Subject<CatFormBehavior>) {
    this.config = {
      behavior: this.behavior ?? new Subject()
    } as CatFormConfig<DataType>
  }

  public fieldset(legend: string, name: string, config: (builder: FormFactory<DataType>) => CatFormConfig<DataType>) {
    if (!this.config.fieldset) this.config.fieldset = [];
    this.config.fieldset.push({
      legend,
      name,
      config: config(new FormFactory<DataType>(this.config.behavior))
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
      name,
      behavior: this.config.behavior
    });
  }
}
