import {
  CatFormFieldOptions,
  CatFormFieldTemplateGridType,
} from './form.interface';
import { CatFormBehavior } from '../common/cat-form-behavior';

export abstract class FormFieldBase<ConfigType extends CatFormFieldOptions> {
  protected config: ConfigType = {} as ConfigType;

  constructor(label: string) {
    this.config.label = label;
    this.config.grid = 12;
  }

  public grid(grid: CatFormFieldTemplateGridType) {
    this.config.grid = grid;
    return this;
  }

  public disabled(disabled = true) {
    this.config.disabled = disabled;
    return this;
  }

  public hidden(hidden = true) {
    this.config.hidden = hidden;
    return this;
  }

  public onChange(onChange: (value: any, behavior: CatFormBehavior, baseTree?: string) => void) {
    this.config.onChange = onChange;
    return this;
  }

  public generate() {
    return this.config;
  }

  public setValue(value: any) {
    this.config.value = value;
    return this;
  }
}
