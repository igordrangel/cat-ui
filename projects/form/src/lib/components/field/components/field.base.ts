import { Directive, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { CatFormFieldConfig } from "../../../builder/form.interface";
import { delay } from "@koalarx/utils/operators/delay";
import { interval, Subject, takeUntil } from "rxjs";

@Directive()
export abstract class FieldBase<FormFieldType> implements OnInit, OnDestroy {
  @Input() control?: FormControl;
  @Input() config?: CatFormFieldConfig & FormFieldType;

  @ViewChild('labelElement') elLabel?: ElementRef<HTMLLabelElement>;
  @ViewChild('inputElement') elInput?: ElementRef<HTMLInputElement>;

  isRequired = false;

  private destroySubscriptions$ = new Subject();

  ngOnDestroy() {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit() {
    interval(300)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(() => {
        this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
        if (this.elLabel?.nativeElement) {
          if (this.isRequired && this.elLabel.nativeElement.innerText.indexOf('*') < 0) {
            this.elLabel.nativeElement.innerText = `${this.elLabel?.nativeElement.innerText} *`;
          } else if (!this.isRequired && this.elLabel.nativeElement.innerText.indexOf('*') >= 0) {
            this.elLabel.nativeElement.innerText = this.elLabel?.nativeElement.innerText.replace('*', '');
          }
        }
      });
    this.focus().then();
  }

  private async focus() {
    if (this.config?.focus) {
      while (!this.elInput) await delay(300);
      this.elInput?.nativeElement?.focus();
    }
  }
}
