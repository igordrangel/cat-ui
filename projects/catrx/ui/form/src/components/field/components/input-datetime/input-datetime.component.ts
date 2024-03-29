import { Component } from '@angular/core';
import { CatFormDatetimeOptions } from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';

@Component({
  selector: 'cat-field-datetime[control][fieldConfig]',
  templateUrl: './input-datetime.component.html',
})
export class InputDatetimeComponent extends FieldBase<
  CatFormDatetimeOptions,
  HTMLInputElement
> {
  public getFormatTypeDate() {
    switch (this.fieldConfig?.type) {
      case 'date':
        return 'shortDate';
      case 'datetime-local':
        return 'short';
      case 'time':
        return 'shortTime';
      default:
        return '';
    }
  }
}
