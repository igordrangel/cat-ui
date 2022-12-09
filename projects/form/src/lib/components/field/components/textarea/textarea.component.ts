import { Component } from "@angular/core";
import { FieldBase } from "../field.base";
import { CatFormTextareaOptions } from "../../../../builder/form.interface";

@Component({
  selector: 'cat-textarea[control][config]',
  templateUrl: 'textarea.component.html',
  styleUrls: ['textarea.component.css','../field.component.css']
})
export class TextareaComponent extends FieldBase<CatFormTextareaOptions> {
  public manageQtyRowsOnPressEnter(keyPress: KeyboardEvent) {
    if (keyPress.key === 'Enter') {
      alert('Pressionou Enter');
    }
  }
}
