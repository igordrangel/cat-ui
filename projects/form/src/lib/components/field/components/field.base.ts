import { Directive, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CatFormFieldConfig } from "../../../builder/form.interface";
import { delay } from "@koalarx/utils/operators/delay";

@Directive()
export abstract class FieldBase<FormFieldType,ElInputType extends HTMLElement> implements OnInit {
  @Input() control?: FormControl;
  @Input() config?: CatFormFieldConfig & FormFieldType;

  @ViewChild('inputElement') elInput?: ElementRef<ElInputType>;

  ngOnInit() {
    this.focus().then();
    this.customInit();
  }

  protected customInit() {}

  private async focus() {
    if (this.config?.focus) {
      while (!this.elInput) await delay(300);
      this.elInput?.nativeElement?.focus();
    }
  }
}
