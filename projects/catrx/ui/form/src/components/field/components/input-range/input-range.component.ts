import { Component } from '@angular/core';
import { CatFormRangeOptions } from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';

@Component({
  selector: 'cat-field-range[control][fieldConfig]',
  templateUrl: 'input-range.component.html',
})
export class InputRangeComponent extends FieldBase<CatFormRangeOptions, HTMLInputElement> {
  protected override customInit(): void {
    if (!this.control.value) {
      this.control.setValue(this.fieldConfig.min ?? 0);
    }
  }

  getRangePosition() {
    const current = this.control.value;
    const min = this.fieldConfig.min ?? 0;
    const max = this.fieldConfig.max ?? 100;

    return (current - min) * 100 / (max - min);
  }

  setValueOnRange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.control.setValue(target.value);
  }

  getRangeOptions() {
    const options: Array<{ value: number; label: string; }> = [];
    const startWith = this.fieldConfig.min ?? 0;
    const endWith = this.fieldConfig.max ?? 100;
    const range = this.fieldConfig.range ?? 1;

    for (let i = startWith; i <= endWith; i += range) {
      options.push({
        label: i.toString(),
        value: i
      })
    }

    return options;
  }
}
