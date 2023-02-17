import { Component, ElementRef, TemplateRef } from '@angular/core';

@Component({
  templateUrl: './dropdown-content.component.html',
  styleUrls: ['./dropdown-content.component.css']
})
export class DropdownContentComponent {
  dropdownContent: TemplateRef<any>;
  left = 0;
  top = 0;
  visible = false;

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}
