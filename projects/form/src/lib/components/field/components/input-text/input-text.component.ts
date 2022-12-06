import { Component } from "@angular/core";
import { FieldBase } from "../field.base";

@Component({
  selector: 'cat-input-text[control][config]',
  templateUrl: 'input-text.component.html',
  styleUrls: ['input-text.component.css']
})
export class InputTextComponent extends FieldBase {
}
