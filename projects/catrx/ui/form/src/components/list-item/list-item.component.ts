import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CatFormListItemConfig } from '../../builder/form.interface';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { toCamelCase } from '@koalarx/utils/operators/string';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { getValueByTree } from '../../common/cat-object.helper';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { skipWhile } from 'rxjs/internal/operators/skipWhile';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { FormService } from '../../form.service';

@Component({
  selector: 'cat-form-list-item[listItemConfig]',
  templateUrl: './list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnInit, OnDestroy {
  @Input() listItemConfig: CatFormListItemConfig;
  @Input() variableTree?: string;
  @Input() highlightInvalidFields = false;
  @Output() emitFormGroup = new EventEmitter<FormArray>();
  @Output() removeFormGroup = new EventEmitter<string>();
  @Output() isHiddenList = new EventEmitter<boolean>();

  public formListItem?: FormGroup;
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
    if (this.listItemConfig.config.behavior) {
      this.listItemConfig.config.behavior.subject
        .pipe(
          skipWhile((value) => Object.keys(value).length === 0),
          takeUntil(this.destroySubscriptions$)
        )
        .subscribe((options) => {
          if (options.showFields) this.isVisible(options.showFields);
          if (options.hideFields) this.isHidden(options.hideFields);
        });
    }

    this.hidden$.next(this.listItemConfig.options?.hidden ?? false);
    this.hidden$
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe((hidden) => {
        this.isHiddenList.emit(hidden);
        if (!hidden) {
          this.isVisible([this.getTree()], false);
        } else {
          this.isHidden([this.getTree()], false);
        }
      });

    this.autoAddItemByPayload();
    this.autofill();
  }

  public addItem() {
    if (
      (this.listItemConfig.options?.maxItems &&
        this.getItemList().controls.length + 1 <=
        this.listItemConfig.options?.maxItems) ||
      !this.listItemConfig.options?.maxItems
    )
      this.getItemList().push(this.fb.group({}));
  }

  public removeItem(index: number) {
    if (
      (this.listItemConfig.options?.minItems &&
        this.getItemList().controls.length - 1 >=
        this.listItemConfig.options?.minItems) ||
      !this.listItemConfig.options?.minItems
    )
      this.getItemList().removeAt(index);
  }

  public addFormGroup(
    index: number,
    name: string,
    formGroup: FormGroup | FormArray
  ) {
    const form = (this.getItemList()?.controls?.[index] as FormGroup)
    if (form) {
      const controlName = toCamelCase(name);

      if (form.controls[controlName]) {
        form.removeControl(controlName)
      }

      form.addControl(controlName, formGroup);
    }
  }

  public addFormControl(index: number, name: string, formControl: FormControl) {
    const form = (this.getItemList()?.controls?.[index] as FormGroup)

    if (form) {
      const controlName = toCamelCase(name);

      if (form.controls[controlName]) {
        form.removeControl(controlName)
      }

      form.addControl(controlName, formControl);
    }
  }

  public removeChildFormGroup(groupName: string) {
    this.formListItem?.removeControl(groupName);
  }

  public getFullListItemName(index: number) {
    const name = this.listItemConfig?.name;

    const prefix = name.substring(0, name.length - 3);
    let suffix = name.substring(name.length - 3);
    if (suffix === `[${index - 1}]`) {
      suffix = suffix.replace(`[${index - 1}]`, `[${index}]`);
    } else {
      suffix += `[${index}]`;
    }

    if (this.variableTree) {
      return `${this.variableTree}.${prefix}${suffix}`;
    }
    return `${prefix}${suffix}`;
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

  public getItemList() {
    return this.formListItem?.get(this.listItemConfig.name) as FormArray;
  }

  private getTree() {
    return `${this.variableTree ? this.variableTree + '.' : ''}${this.listItemConfig.name
      }`;
  }

  private isVisible(fields: string[], propagate = true) {
    if (fields.indexOf(this.getTree()) >= 0) {
      if (propagate) this.hidden$.next(false);
      this.startList();
    }
  }

  private isHidden(fields: string[], propagate = true) {
    if (fields.indexOf(this.getTree()) >= 0) {
      if (propagate) this.hidden$.next(true);
      this.clearList();
    }
  }

  private startList() {
    const isFirstLoad = !!this.formListItem;

    this.formListItem = this.fb.group({
      [this.listItemConfig.name]: this.fb.array([]),
    });

    this.emitFormGroup.emit(this.getItemList());

    if (isFirstLoad) {
      this.autoAddItemByPayload();
    } else {
      if (
        this.listItemConfig.options?.minItems > 0 &&
        this.getItemList().length < this.listItemConfig.options?.minItems
      ) {
        for (let i = 1; i <= this.listItemConfig.options?.minItems; i++) {
          this.addItem();
        }
      }
    }
  }

  private clearList() {
    this.formListItem = null;
    this.removeFormGroup.emit(this.getTree());
  }

  private autoAddItemByPayload() {
    if (!this.hidden$.getValue()) {
      const value = getValueByTree(
        this.listItemConfig.config.autofill,
        this.getTree()
      );

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (!this.getItemList()?.controls?.[index]) {
            this.addItem();
          }
        });
      }
    }
  }

  private autofill() {
    this.listItemConfig.config.behavior.setValues(
      this.formService.getAutofillDataTree(this.listItemConfig.config)
    ).send();
  }
}
