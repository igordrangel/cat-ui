import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CatFormFieldsetConfig } from "../../builder/form.interface";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { toCamelCase } from "@koalarx/utils/operators/string";

@Component({
  selector: 'cat-form-fieldset',
  templateUrl: 'fieldset.component.html',
  styleUrls: ['fieldset.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsetComponent implements OnInit {
  @Input() fieldsetConfig?: CatFormFieldsetConfig;
  @Output() emitFormGroup = new EventEmitter<FormGroup>();

  public formFieldset?: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formFieldset = this.fb.group({});
    this.emitFormGroup.emit(this.formFieldset);
  }

  public addFormGroup(legend: string, formGroup: FormGroup) {
    this.formFieldset?.addControl(toCamelCase(legend), formGroup);
  }

  public addFormControl(name: string, formControl: FormControl) {
    this.formFieldset?.addControl(toCamelCase(name), formControl);
  }
}
