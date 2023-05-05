import { Component, ElementRef, TemplateRef } from '@angular/core';

@Component({
  template: `
    <div
      class="cat-dropdown-content"
      [style.left]="left + 'px'"
      [style.top]="top + 'px'"
      [style.visibility]="visible ? 'visible' : 'hidden'"
    >
      <ng-component *ngTemplateOutlet="dropdownContent" />
    </div>
  `,
})
export class DropdownContentComponent {
  dropdownContent: TemplateRef<any>;
  left = 0;
  top = 0;
  visible = false;

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
