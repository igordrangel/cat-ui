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

  public formListItem?: FormGroup;

  private destroySubscriptions$ = new Subject<boolean>();

  constructor(private fb: FormBuilder) {}

  ngOnDestroy(): void {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit() {
    this.formListItem = this.fb.group({
      [this.listItemConfig.name]: this.fb.array([]),
    });
    this.emitFormGroup.emit(this.getItemList());

    if (this.listItemConfig.options?.minItems > 0) {
      for (let i = 1; i <= this.listItemConfig.options?.minItems; i++) {
        this.addItem();
      }
    }

    if (this.listItemConfig.config.autofill) {
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
    (this.getItemList()?.controls?.[index] as FormGroup)?.addControl(
      name,
      formGroup
    );
  }

  public addFormControl(index: number, name: string, formControl: FormControl) {
    (this.getItemList()?.controls?.[index] as FormGroup).addControl(
      toCamelCase(name),
      formControl
    );
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
      el.classList.add('d-none');
    } else {
      el.classList.add('d-block');
    }
  }

  public getItemList() {
    return this.formListItem.get(this.listItemConfig.name) as FormArray;
  }

  private getTree() {
    return `${this.variableTree ? this.variableTree + '.' : ''}${
      this.listItemConfig.name
    }`;
  }

  private getIndexItemByTree(fieldPath: string) {
    const tree = this.getTree();

    if (fieldPath.indexOf(tree) >= 0) {
      const partThree = fieldPath.replace(tree, '');
      return parseInt(
        partThree.substring(partThree.indexOf('[') + 1, partThree.indexOf(']'))
      );
    }
    return -1;
  }
}
