import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { CatButtonComponent, CatButtonType } from "../cat-button.component";

@Component({
  selector: 'cat-primary-button',
  template: `<cat-button
    [color]="outline ? 'btn-outline-primary' : 'btn-primary'"
    [type]="type"
    [showLoader]="showLoader"
    [class]="class"
    [disabled]="disabled"
  >
    <ng-content></ng-content
  ></cat-button>`,
  standalone: true,
  imports: [CommonModule, CatButtonComponent],
})
export class CatPrimaryButtonComponent {
  @Input() type: CatButtonType = 'button';
  @Input() showLoader = false;
  @Input() outline = false;
  @Input() class?: string;
  @Input() disabled?: boolean;
}
