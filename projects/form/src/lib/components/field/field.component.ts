import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CatFormFieldConfig } from "../../builder/form.interface";
import { FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'cat-form-field',
  templateUrl: 'field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldComponent {
  @Input() fieldConfig?: CatFormFieldConfig;
  @Output() emitFormControl = new EventEmitter<FormControl>();

  public control?: FormControl;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.fieldConfig) {
      this.control = this.fb.control({
        value: this.fieldConfig.value,
        disabled: this.fieldConfig.disabled ?? false
      }, this.fieldConfig.validators, this.fieldConfig.asyncValidators);

      this.emitFormControl.emit(this.control);
    }
  }
}
