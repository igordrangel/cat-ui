import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import {
  CatFormBehavior,
  CatFormBehaviorAsyncValidator,
  CatFormBehaviorValidator,
  CatFormFieldConfig
} from "../../builder/form.interface";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { BehaviorSubject, debounceTime, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'cat-form-field[fieldConfig]',
  templateUrl: 'field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldComponent implements OnDestroy {
  @Input() fieldConfig?: CatFormFieldConfig;
  @Input() variableTree?: string;
  @Output() emitFormControl = new EventEmitter<FormControl>();

  public control?: FormControl;
  public hidden$ = new BehaviorSubject<boolean>(false);

  private destroySubscriptions$ = new Subject();

  constructor(private fb: FormBuilder) {
  }

  ngOnDestroy() {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit() {
    if (this.fieldConfig) {
      this.addControl();
      this.hidden$.next(this.fieldConfig.hidden ?? false);

      if (!this.fieldConfig.hidden) {
        if (this.fieldConfig.onChange) {
          this.control
              ?.valueChanges
              .pipe(
                takeUntil(this.destroySubscriptions$),
                debounceTime(300)
              )
              .subscribe(value => {
                if (this.fieldConfig?.onChange) {
                  this.fieldConfig?.onChange(value, this.fieldConfig?.behavior)
                }
              });
        }
      } else {
        this.removeValidators();
      }

      if (this.fieldConfig.disabled) {
        this.removeValidators();
      }

      if (this.fieldConfig.behavior) {
        this.fieldConfig
            .behavior
            .pipe(takeUntil(this.destroySubscriptions$))
            .subscribe(options => {
              if (options.enableFields) this.isEnabled(options.enableFields);
              if (options.disableFields) this.isDisable(options.disableFields);

              if (options.showFields) this.isVisible(options.showFields);
              if (options.hideFields) this.isHidden(options.hideFields);

              if (options.replaceValidators) this.changeValidators(options.replaceValidators);
              if (options.replaceAsyncValidators) this.changeAsyncValidators(options.replaceAsyncValidators);
            });
      }
    }
  }

  private addControl() {
    if (this.fieldConfig) {
      this.control = this.fb.control({
        value: this.fieldConfig.value,
        disabled: this.fieldConfig.disabled ?? false
      }, this.fieldConfig.validators, this.fieldConfig.asyncValidators);
      this.emitFormControl.emit(this.control);
    }
  }

  private isEnabled(fields: string[]) {
    if (fields.indexOf(this.getFullFieldName()) >= 0) {
      this.control?.enable();
      this.setDefaultValidators();
      console.log(this.getFullFieldName(), this.control?.hasValidator(Validators.required))
    }
  }

  private isDisable(fields: string[]) {
    if (fields.indexOf(this.getFullFieldName()) >= 0) {
      this.control?.disable();
      this.removeValidators();
    }
  }

  private isVisible(fields: string[]) {
    if (fields.indexOf(this.getFullFieldName()) >= 0) {
      this.hidden$.next(false);
      this.setDefaultValidators();
    }
  }

  private isHidden(fields: string[]) {
    if (fields.indexOf(this.getFullFieldName()) >= 0) {
      this.hidden$.next(true);
      this.removeValidators();
    }
  }

  private changeValidators(options: CatFormBehaviorValidator[]) {
    const optionField = options.find(option => option.name === this.getFullFieldName());
    if (optionField) {
      this.control?.clearValidators();
      if (optionField.validators.length > 0) this.control?.addValidators(optionField.validators);
      this.control?.updateValueAndValidity();
      this.control?.markAllAsTouched();
    }
  }

  private changeAsyncValidators(options: CatFormBehaviorAsyncValidator[]) {
    const optionField = options.find(option => option.name === this.getFullFieldName());
    if (optionField) {
      this.control?.clearAsyncValidators();
      if (optionField.asyncValidators.length > 0) this.control?.addAsyncValidators(optionField.asyncValidators);
      this.control?.updateValueAndValidity();
      this.control?.markAllAsTouched();
    }
  }

  private getFullFieldName() {
    const name = this.fieldConfig?.name;
    if (this.variableTree) {
      return `${this.variableTree}.${name}`;
    }
    return name ?? '';
  }

  private setDefaultValidators() {
    if (this.fieldConfig) {
      this.changeValidators([{name: this.getFullFieldName(), validators: this.fieldConfig.validators ?? []}]);
      this.changeAsyncValidators([{name: this.getFullFieldName(), asyncValidators: this.fieldConfig.asyncValidators ?? []}]);
    }
  }

  private removeValidators() {
    if (this.fieldConfig) {
      this.changeValidators([{name: this.getFullFieldName(), validators: []}]);
      this.changeAsyncValidators([{name: this.getFullFieldName(), asyncValidators: []}]);
    }
  }
}
