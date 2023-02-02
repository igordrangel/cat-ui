import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs/internal/observable/interval';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { CatFormFieldConfig } from '../../../../../builder/form.interface';

@Component({
  selector: 'cat-form-field-content[control][config][elInput]',
  templateUrl: 'field-content.component.html',
  styleUrls: ['../../../field.component.css'],
})
export class FieldContentComponent implements OnInit, OnDestroy {
  @Input() control?: FormControl;
  @Input() config?: CatFormFieldConfig;
  @Input() elInput?: ElementRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  @ViewChild('labelElement') elLabel?: ElementRef<HTMLLabelElement>;

  isRequired = false;

  private destroySubscriptions$ = new Subject();

  ngOnDestroy() {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit() {
    interval(300)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(() => {
        this.isRequired =
          this.control?.hasValidator(Validators.required) ?? false;
        if (this.elLabel?.nativeElement) {
          if (
            this.isRequired &&
            this.elLabel.nativeElement.innerText.indexOf('*') < 0
          ) {
            this.elLabel.nativeElement.innerText = `${this.elLabel?.nativeElement.innerText} *`;
          } else if (
            !this.isRequired &&
            this.elLabel.nativeElement.innerText.indexOf('*') >= 0
          ) {
            this.elLabel.nativeElement.innerText =
              this.elLabel?.nativeElement.innerText.replace('*', '');
          }
        }

        if (this.config) this.config.required = this.isRequired;
      });
  }
}
