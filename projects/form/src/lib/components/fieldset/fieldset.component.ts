import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CatFormFieldsetConfig } from '../../builder/form.interface';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { toCamelCase } from '@koalarx/utils/operators/string';

@Component({
  selector: 'cat-form-fieldset',
  templateUrl: 'fieldset.component.html',
  styleUrls: ['fieldset.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetComponent implements OnInit {
  @Input() fieldsetConfig?: CatFormFieldsetConfig;
  @Input() variableTree?: string;
  @Input() highlightInvalidFields = false;
  @Output() emitFormGroup = new EventEmitter<FormGroup>();

  public formFieldset?: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formFieldset = this.fb.group({});
    this.emitFormGroup.emit(this.formFieldset);
  }

  public addFormGroup(name: string, formGroup: FormGroup | FormArray) {
    this.formFieldset?.addControl(name, formGroup);
  }

  public addFormControl(name: string, formControl: FormControl) {
    this.formFieldset?.addControl(toCamelCase(name), formControl);
  }

  public getFullFieldsetName() {
    const name = this.fieldsetConfig?.name;
    if (this.variableTree) {
      return `${this.variableTree}.${name}`;
    }
    return name ?? '';
  }

  public hideField(el: HTMLDivElement, hide: boolean) {
    if (hide) {
      el.classList.add('d-none');
    } else {
      el.classList.add('d-block');
    }
  }
}
