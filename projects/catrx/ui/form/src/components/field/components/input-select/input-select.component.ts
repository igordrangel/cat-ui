import { Component } from '@angular/core';
import { CatFormListOptions, CatFormSelectOptions } from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';
import { CatSelectOption } from './../../../../common/cat-select-option';

@Component({
  selector: 'cat-field-select[control][fieldConfig]',
  templateUrl: 'input-select.component.html',
})
export class InputSelectComponent extends FieldBase<
  CatFormSelectOptions,
  HTMLSelectElement
  > {

  optionIsComponent(option: CatFormListOptions) {
    return option.name instanceof CatSelectOption;
  }

  getCompomentOption(option: CatFormListOptions) {
    return option.name as CatSelectOption;
  }
}
