import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { CatButtonComponent, CatButtonType } from "../cat-button.component";

@Component({
  selector: 'cat-danger-button',
  template: `<cat-button
    [color]="outline ? 'btn-outline-danger' : 'btn-danger'"
    [type]="type"
    [showLoader]="showLoader"
    [class]="class"
  >
    <ng-content></ng-content
  ></cat-button>`,
  standalone: true,
  imports: [CommonModule, CatButtonComponent],
})
export class CatDangerButtonComponent {
  @Input() type: CatButtonType = 'button';
  @Input() showLoader = false;
  @Input() outline = false;
  @Input() class?: string;
}
