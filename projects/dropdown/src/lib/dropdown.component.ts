import { Component, Input } from '@angular/core';
import { koala } from '@koalarx/utils';
import { randomString } from '@koalarx/utils/operators/string';
import { Observable } from 'rxjs';

export type CatDropdownPosition =
  | 'top'
  | 'top right'
  | 'top left'
  | 'bottom'
  | 'bottom right'
  | 'bottom left'
  | 'left'
  | 'right';

@Component({
  selector: 'cat-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class CatDropdownComponent {
  @Input() position: CatDropdownPosition = 'top';
  @Input() insideClick = true;
  @Input() disabled = false;

  ariaControl$ = new Observable<string>((observe) => {
    this.getAriaControl().then((ariaControl) => {
      observe.next(ariaControl);
      observe.complete();
    });
  });

  private getAriaControl() {
    return new Promise<string>((resolve) => {
      let ariaControl: string;

      do {
        ariaControl = koala('cat-dropdown-')
          .string()
          .concat(
            randomString(10, {
              lowercase: true,
              uppercase: true,
              numbers: false,
              specialCharacters: false,
            })
          )
          .getValue();
      } while (document.getElementById(ariaControl));

      resolve(ariaControl);
    });
  }
}
