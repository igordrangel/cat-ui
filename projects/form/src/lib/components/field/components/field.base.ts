import { Component, Directive, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { CatFormFieldConfig } from "../../../builder/form.interface";
import { delay } from "@koalarx/utils/operators/delay";

@Directive()
export abstract class FieldBase implements OnInit {
  @Input() control?: FormControl;
  @Input() config?: CatFormFieldConfig;

  @ViewChild('inputElement') elInput?: ElementRef<HTMLInputElement>;

  isRequired: boolean = false;

  ngOnInit() {
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
    this.focus().then();
  }

  private async focus() {
    if (this.config?.focus) {
      while (!this.elInput) await delay(300);
      this.elInput?.nativeElement?.focus();
    }
  }
}
