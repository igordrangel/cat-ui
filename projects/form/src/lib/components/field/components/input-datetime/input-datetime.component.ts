import { Component } from '@angular/core';
import { CatFormDatetimeOptions } from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';

@Component({
  selector: 'cat-field-datetime[control][config]',
  templateUrl: './input-datetime.component.html',
  styleUrls: ['../../field.component.css']
})
export class InputDatetimeComponent extends FieldBase<
  CatFormDatetimeOptions,
  HTMLInputElement
> {
  public getFormatTypeDate() {
    switch (this.config?.type) {
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
