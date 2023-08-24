import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CatFormFieldsetConfig } from '../../builder/form.interface';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { toCamelCase } from '@koalarx/utils/operators/string';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { skipWhile } from 'rxjs/internal/operators/skipWhile';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { FormService } from '../../form.service';

@Component({
  selector: 'cat-form-fieldset',
  templateUrl: 'fieldset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetComponent implements OnInit, OnDestroy {
  @Input() fieldsetConfig?: CatFormFieldsetConfig;
  @Input() variableTree?: string;
  @Input() highlightInvalidFields = false;
  @Output() emitFormGroup = new EventEmitter<FormGroup>();
  @Output() removeFormGroup = new EventEmitter<string>();
  @Output() isHiddenFieldset = new EventEmitter<boolean>();

  public formFieldset?: FormGroup;
  public hidden$ = new BehaviorSubject<boolean>(false);

  private destroySubscriptions$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private formService: FormService
  ) { }

  ngOnDestroy(): void {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit() {
    this.startFieldset();
    this.hidden$.next(this.fieldsetConfig.config.hidden ?? false);

    if (this.fieldsetConfig.config.behavior) {
      this.fieldsetConfig.config.behavior.subject
        .pipe(
          skipWhile((value) => Object.keys(value).length === 0),
          takeUntil(this.destroySubscriptions$)
        )
        .subscribe((options) => {
          if (options.showFields) this.isVisible(options.showFields);
          if (options.hideFields) this.isHidden(options.hideFields);
        });
    }

    this.hidden$
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe((hidden) => this.isHiddenFieldset.emit(hidden));
  }

  public addFormGroup(name: string, formGroup: FormGroup | FormArray) {
    if (this.formFieldset) {
      const controlName = toCamelCase(name);

      if (this.formFieldset.controls[controlName]) {
        this.formFieldset.removeControl(controlName)
      }

      this.formFieldset.addControl(controlName, formGroup);
    }
  }

  public addFormControl(name: string, formControl: FormControl) {
    if (this.formFieldset) {
      const controlName = toCamelCase(name);

      if (this.formFieldset.controls[controlName]) {
        this.formFieldset.removeControl(controlName)
      }

      this.formFieldset.addControl(controlName, formControl);
    }
  }

  public removeChildFormGroup(groupName: string) {
    this.formFieldset?.removeControl(groupName);
  }

  public getFullFieldsetName() {
    const name = this.fieldsetConfig?.name;
    if (this.variableTree) {
      return `${this.variableTree}.${name}`;
    }
    return name ?? '';
  }

  public hideField(el: HTMLDivElement, hide: boolean) {
    if (hide) {
      el.classList.remove('d-block');
      el.classList.add('d-none');
    } else {
      el.classList.remove('d-none');
      el.classList.add('d-block');
    }
  }

  private isVisible(fields: string[]) {
    if (fields.indexOf(this.getFullFieldsetName()) >= 0) {
      this.hidden$.next(false);
      this.startFieldset();
    }
  }

  private isHidden(fields: string[]) {
    if (fields.indexOf(this.getFullFieldsetName()) >= 0) {
      this.hidden$.next(true);
      this.clearFieldset();
    }
  }

  private startFieldset() {
    this.formFieldset = this.fb.group({});
    this.emitFormGroup.emit(this.formFieldset);
  }

  private clearFieldset() {
    this.formFieldset = null;
    this.removeFormGroup.emit(this.getFullFieldsetName());
  }
}
