import { Component, Directive, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { CatFormFieldConfig } from "../../../builder/form.interface";
import { delay } from "@koalarx/utils/operators/delay";
import { interval, Subject, takeUntil } from "rxjs";

@Directive()
export abstract class FieldBase implements OnInit, OnDestroy {
  @Input() control?: FormControl;
  @Input() config?: CatFormFieldConfig;

  @ViewChild('inputElement') elInput?: ElementRef<HTMLInputElement>;

  isRequired: boolean = false;

  private destroySubscriptions$ = new Subject();

  ngOnDestroy() {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit() {
    interval(300)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(() => this.isRequired = this.control?.hasValidator(Validators.required) ?? false);
    this.focus().then();
  }

  private async focus() {
    if (this.config?.focus) {
      while (!this.elInput) await delay(300);
      this.elInput?.nativeElement?.focus();
    }
  }
}
