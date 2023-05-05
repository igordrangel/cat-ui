import { DropdownConfig } from './cat-dropdown.directive';
import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CatDropdownPosition } from './dropdown.interface';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'cat-dropdown',
  template: `
    <div [catDropdown]="getDropdownConfig()">
      <ng-content select="[trigger]"></ng-content>
      <ng-template #dropdownContent>
        <ng-content select="[content]"></ng-content>
      </ng-template>
    </div>
  `,
})
export class DropdownComponent {
  @Input() position: CatDropdownPosition = 'top';
  @Input() insideClick = true;
  @Input() disabled = false;
  @Output() onClose = new EventEmitter<boolean>();

  @ViewChild('dropdownContent') dropdownContent: TemplateRef<any>;

  private closeDropdown$ = new Subject<boolean>();

  close() {
    this.closeDropdown$.next(true);
  }

  getDropdownConfig() {
    return {
      templateRef: this.dropdownContent,
      disabled: this.disabled,
      insideClick: this.insideClick,
      position: this.position,
      onClose: (isClosed: boolean) => {
        if (isClosed) this.onClose.emit(isClosed);
      },
      close: this.closeDropdown$,
    } as DropdownConfig;
  }
}
