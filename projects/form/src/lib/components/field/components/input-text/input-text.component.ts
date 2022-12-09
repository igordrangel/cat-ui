import { Component } from "@angular/core";
import { FieldBase } from "../field.base";

@Component({
  selector: 'cat-input-text[control][config]',
  templateUrl: 'input-text.component.html',
  styleUrls: ['../field.component.css']
})
export class InputTextComponent extends FieldBase {
}
