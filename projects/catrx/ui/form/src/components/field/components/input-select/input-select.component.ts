import { Component, Input } from '@angular/core';
import {
  CatFormListOptions,
  CatFormSelectOptions,
} from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';
import { CatSelectOption } from './../../../../common/cat-select-option';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'cat-field-select[control][fieldConfig]',
  templateUrl: 'input-select.component.html',
})
export class InputSelectComponent extends FieldBase<
  CatFormSelectOptions,
  HTMLSelectElement
> {
  @Input() options$ = new BehaviorSubject<CatFormListOptions[]>(null);

  protected override customInit(): void {
    if (this.fieldConfig.options) {
      this.fieldConfig
        .options
        .subscribe(options => this.options$.next(options))
    }
  }

  optionIsComponent(option: CatFormListOptions) {
    return option.name instanceof CatSelectOption;
  }

  getCompomentOption(option: CatFormListOptions) {
    return option.name as CatSelectOption;
  }
}
