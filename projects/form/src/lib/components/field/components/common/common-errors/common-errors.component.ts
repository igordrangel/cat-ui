import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CatFormFieldConfig } from "../../../../../builder/form.interface";

@Component({
  selector: 'cat-form-field-common-errors[control][config]',
  templateUrl: 'common-errors.component.html',
  styleUrls: ['../../../field.component.css']
})
export class CommonErrorsComponent {
  @Input() control?: FormControl;
  @Input() config?: CatFormFieldConfig;
}
