import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FieldBase } from "../field.base";

@Component({
  selector: 'cat-input-text[control][config]',
  templateUrl: 'input-text.component.html',
  styleUrls: ['input-text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent extends FieldBase {
}
