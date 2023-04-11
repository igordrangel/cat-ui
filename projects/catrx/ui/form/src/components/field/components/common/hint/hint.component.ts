import { Component, ElementRef, Input } from '@angular/core';
import { CatFormFieldConfig } from '../../../../../builder/form.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cat-form-field-hint[control][config][elInput]',
  templateUrl: 'hint.component.html',
})
export class HintComponent {
  @Input() control?: FormControl;
  @Input() config?: CatFormFieldConfig;
  @Input() elInput?: ElementRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
}
