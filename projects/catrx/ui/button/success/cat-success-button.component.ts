import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CatButtonComponent, CatButtonType } from '@catrx/ui/button';

@Component({
  selector: 'cat-success-button',
  template: `<cat-button
    [color]="outline ? 'btn-outline-success' : 'btn-success'"
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
export class CatSuccessButtonComponent {
  @Input() type: CatButtonType = 'button';
  @Input() showLoader = false;
  @Input() outline = false;
  @Input() class?: string;
  @Input() disabled?: boolean;
}
