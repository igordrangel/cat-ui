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

@Component({
  selector: 'cat-form-list-item[listItemConfig]',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnInit {
  @Input() listItemConfig: CatFormListItemConfig;
  @Input() variableTree?: string;
  @Input() highlightInvalidFields = false;
  @Output() emitFormGroup = new EventEmitter<FormArray>();

  public formListItem?: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  public addFormControl(index: number, name: string, formControl: FormControl) {
    (this.getItemList()?.controls?.[index] as FormGroup).addControl(
      toCamelCase(name),
      formControl
    );
  }

  public getFullListItemName() {
    const name = this.listItemConfig?.name;
    if (this.variableTree) {
      return `${this.variableTree}.${name}`;
    }
    return name ?? '';
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
}
