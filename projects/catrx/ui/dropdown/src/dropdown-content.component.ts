import { Component, ElementRef, TemplateRef, signal } from '@angular/core';

@Component({
  template: `
    <div
      class="cat-dropdown-content"
      [style.left]="left() + 'px'"
      [style.top]="top() + 'px'"
      [style.visibility]="visible() ? 'visible' : 'hidden'"
    >
      <ng-component *ngTemplateOutlet="dropdownContent" />
    </div>
  `,
})
export class DropdownContentComponent {
  dropdownContent: TemplateRef<any>;
  left = signal(0);
  top = signal(0);
  visible = signal(false);

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
