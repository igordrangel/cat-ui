import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CatLoaderModule } from '@catrx/ui/loader';

export type CatButtonType = 'button' | 'submit';

@Component({
  selector: 'cat-button[color]',
  template: `<button
    [type]="type"
    [attr.class]="'btn btn-sm ' + color + ' ' + (class ?? '')"
    [disabled]="showLoader || disabled"
    [ngClass]="{ loading: showLoader }"
  >
    <cat-loader *ngIf="showLoader" class="mr-5"></cat-loader>
    <ng-content></ng-content>
  </button>`,
  styleUrls: ['./cat-button.component.css'],
  standalone: true,
  imports: [CommonModule, CatLoaderModule],
})
export class CatButtonComponent {
  @Input() color: string;
  @Input() type: CatButtonType = 'button';
  @Input() showLoader = false;
  @Input() class?: string;
  @Input() disabled?: boolean;
}
