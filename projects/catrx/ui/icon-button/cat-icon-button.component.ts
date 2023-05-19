import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CatTooltipModule, CatTooltipPosition } from '@catrx/ui/tooltip';

export type CatIconButtonColor =
  | 'primary'
  | 'primary-inverse'
  | 'primary-bg-transparent'
  | 'danger'
  | 'danger-inverse'
  | 'danger-bg-transparent'
  | 'warning'
  | 'warning-inverse'
  | 'warning-bg-transparent';

@Component({
  selector: 'cat-icon-button',
  standalone: true,
  imports: [CommonModule, CatTooltipModule],
  template: `
    <button
      class="cat-icon-button"
      [ngClass]="color"
      [catTooltip]="tooltip ?? ''"
      [catTooltipPosition]="tooltipoPosition ?? 'above'"
      [disabled]="disabled">
      <i [class]="icon"></i>
    </button>
  `,
})
export class CatIconButtonComponent {
  @Input({ required: true }) icon: string;
  @Input() color?: CatIconButtonColor;
  @Input() tooltip?: string;
  @Input() tooltipoPosition?: CatTooltipPosition;
  @Input() disabled?: boolean;
}
