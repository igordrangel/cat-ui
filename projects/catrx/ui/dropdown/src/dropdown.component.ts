import { DropdownConfig } from './cat-dropdown.directive';
import { Component, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { CatDropdownPosition } from './dropdown.interface';

@Component({
  selector: 'cat-dropdown',
  templateUrl: './dropdown.component.html',
})
export class CatDropdownComponent {
  @Input() position: CatDropdownPosition = 'top';
  @Input() insideClick = true;
  @Input() disabled = false;
  @Output() onClose = new EventEmitter<boolean>();

  @ViewChild('dropdownContent') dropdownContent: TemplateRef<any>;

  getDropdownConfig() {
    return {
      templateRef: this.dropdownContent,
      disabled: this.disabled,
      insideClick: this.insideClick,
      position: this.position,
      onClose: (isClosed: boolean) => {
        if (isClosed) this.onClose.emit(isClosed);
      }
    } as DropdownConfig;
  }
}
