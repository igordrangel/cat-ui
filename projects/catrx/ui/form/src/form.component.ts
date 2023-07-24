import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  CatFormBehaviorSetValue,
  CatFormConfig,
  CatFormElementConfig,
} from './builder/form.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { klString, toCamelCase } from '@koalarx/utils/operators/string';
import { clone } from '@koalarx/utils/operators/object';
import { FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { first } from 'rxjs/internal/operators/first';
import { getValueByTree } from './common/cat-object.helper';

@Component({
  selector: 'cat-form[config]',
  templateUrl: 'form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  @Input() config?: CatFormConfig<any>;

  @Output() isValid = new EventEmitter<boolean>();
  @Output() submitted = new EventEmitter<boolean>();

  public dynamicForm?: UntypedFormGroup;
  public highlightInvalidFields$ = new BehaviorSubject<boolean>(false);

  @ViewChild('formElement') private elForm?: ElementRef<HTMLFormElement>;
  private destroySubscriptions$ = new Subject();

  private autofillValues: CatFormBehaviorSetValue[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dynamicForm = this.fb.group({});

    if (this.dynamicForm) {
      this.dynamicForm.valueChanges
        .pipe(takeUntil(this.destroySubscriptions$), debounceTime(300))
        .subscribe(() => {
          if (this.config?.onChange) {
            this.config?.onChange(this.getFormData());
          }
          this.isValid.emit(this.dynamicForm?.valid);
        });
    }

    if (this.config.autofill) {
      setTimeout(() => {
        this.generateAutofillDataTree(this.config.autofill);
        this.config.behavior.setValues(this.autofillValues).send();
      }, 1);
    }
  }

  public submit(
    cbBeforeSend?: () => void,
    cbSuccess?: (response: any) => void,
    cbError?: (err: any) => void
  ) {
    if (this.config && this.dynamicForm?.valid && this.config.onSubmit) {
      if (cbBeforeSend) cbBeforeSend();
      this.config
        .onSubmit(this.getFormData())
        .pipe(first())
        .subscribe({
          next: (response) => {
            if (cbSuccess) cbSuccess(response);
          },
          error: (err) => {
            if (cbError) cbError(err);
          },
        });
    } else {
      this.elForm?.nativeElement?.classList.add('was-validated');
      this.highlightInvalidFields$.next(true);
    }
  }

  public submitOnKeyEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const autocompleteInputIsOpened = !(
        event.target as HTMLInputElement
      ).attributes.getNamedItem('aria-activedescendant');
      const isInput = (event.target as HTMLInputElement).attributes
        .getNamedItem('class')
        ?.value?.includes('form-control');
      const isTexteArea =
        (event.target as HTMLInputElement).attributes.getNamedItem('class')
          ?.ownerElement?.localName === 'textarea';

      if (!autocompleteInputIsOpened || (isInput && !isTexteArea)) {
        this.submitted.emit(true);
      }
    }
  }

  public addFormGroup(legend: string, formGroup: FormGroup | FormArray) {
    this.dynamicForm?.addControl(toCamelCase(legend), formGroup);
  }

  public addFormControl(name: string, formControl: FormControl) {
    this.dynamicForm?.addControl(toCamelCase(name), formControl);
  }

  public removeFormGroup(groupName: string) {
    this.dynamicForm?.removeControl(groupName);
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

  private getFormData() {
    return this.dynamicForm?.getRawValue();
  }

  private generateAutofillDataTree(
    data: { [key: string | number]: any },
    name?: string
  ) {
    if (name) {
      const valueDataByTree = getValueByTree(this.config.autofill, name) as {
        [key: string | number]: any;
      };

      if (Array.isArray(valueDataByTree)) {
        const isObjectArray = !!valueDataByTree.find(
          (item) => typeof item === 'object'
        );
        const isListItem = this.isListItemByName(
          name,
          this.config.formElements
        );

        if (isObjectArray && isListItem) {
          valueDataByTree.forEach((item, indexItem) => {
            clone(Object.keys(item)).forEach((propItem) => {
              const prefix = name.substring(0, name.length - 3);
              let suffix = name.substring(name.length - 3);
              if (suffix === `[${indexItem > 0 ? indexItem - 1 : indexItem}]`) {
                suffix = suffix.replace(`[${indexItem - 1}]`, `[${indexItem}]`);
              } else {
                suffix += `[${indexItem}]`;
              }

              name = this.generateAutofillDataTree(
                item[propItem],
                `${prefix}${suffix}.${propItem}`
              );
            });
          });
        } else {
          this.autofillValues.push({
            name,
            value: valueDataByTree,
          });
        }
      } else if (
        valueDataByTree &&
        typeof valueDataByTree === 'object' &&
        !this.isFileByName(name, this.config.formElements)
      ) {
        clone(Object.keys(valueDataByTree)).forEach((index) => {
          name = this.generateAutofillDataTree(
            valueDataByTree[index],
            `${name}.${index}`
          );
        });
      } else {
        this.autofillValues.push({
          name,
          value: valueDataByTree,
        });
        name = klString(name)
          .split('.')
          .pipe((KlName) => {
            const arrName = KlName.getValue();
            arrName.splice(arrName.length - 1, 1);
            return arrName;
          })
          .toString('.')
          .getValue();
      }
    } else {
      clone(Object.keys(data)).map((index) => {
        if (data[index] && Array.isArray(data[index])) {
          const isObjectArray = !!data[index].find(
            (item) => typeof item === 'object'
          );
          const isListItem = this.isListItemByName(
            index,
            this.config.formElements
          );
          if (isObjectArray && isListItem) {
            data[index].forEach((item, indexItem) => {
              clone(Object.keys(item)).forEach((propItem) => {
                name = this.generateAutofillDataTree(
                  item,
                  `${index}[${indexItem}].${propItem}`
                );
              });
            });
          } else {
            this.autofillValues.push({
              name: index,
              value: data[index],
            });
          }
        } else if (data[index] && typeof data[index] === 'object') {
          clone(Object.keys(data[index])).forEach((objIndex) => {
            name = this.generateAutofillDataTree(
              data[index],
              `${index}.${objIndex}`
            );
          });
        } else {
          this.autofillValues.push({
            name: index,
            value: data[index],
          });
        }
      });
    }

    return name;
  }

  private isListItemByName(
    name: string,
    formElement: CatFormElementConfig[]
  ): boolean {
    return !!formElement.find((formElement) => {
      if (formElement.listItem) {
        const splitedName = name.split('.');
        if (
          splitedName[splitedName.length - 1] === formElement.listItem.name ||
          this.isListItemByName(name, formElement.listItem.config.formElements)
        ) {
          return true;
        }
      }
      return false;
    });
  }

  private isFileByName(
    name: string,
    formElement: CatFormElementConfig[]
  ): boolean {
    return !!formElement.find((formElement) => {
      if (formElement.field) {
        const splitedName = name.split('.');
        if (
          splitedName[splitedName.length - 1] === formElement.field.name &&
          formElement.field.type === 'file'
        ) {
          return true;
        }
      }

      if (formElement.fieldset) {
        if (this.isFileByName(name, formElement.fieldset.config.formElements)) {
          return true;
        }
      }

      if (formElement.listItem) {
        if (this.isFileByName(name, formElement.listItem.config.formElements)) {
          return true;
        }
      }

      return false;
    });
  }
}
