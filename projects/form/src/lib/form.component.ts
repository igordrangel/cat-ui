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
} from './builder/form.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { toCamelCase } from '@koalarx/utils/operators/string';
import { BehaviorSubject, debounceTime, Subject, takeUntil, first } from 'rxjs';
import { clone } from '@koalarx/utils/operators';
import { koala } from '@koalarx/utils';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'cat-form[config]',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
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
      this.submitted.emit(true);
    }
  }

  public addFormGroup(legend: string, formGroup: FormGroup | FormArray) {
    this.dynamicForm?.addControl(toCamelCase(legend), formGroup);
  }

  public addFormControl(name: string, formControl: FormControl) {
    this.dynamicForm?.addControl(toCamelCase(name), formControl);
  }

  public hideField(el: HTMLDivElement, hide: boolean) {
    if (hide) {
      el.classList.add('d-none');
    } else {
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
      const valueDataByTree = eval(`this.config.autofill.${name}`) as {
        [key: string | number]: any;
      };

      if (Array.isArray(valueDataByTree)) {
        valueDataByTree.forEach((item, indexItem) => {
          clone(Object.keys(item)).forEach((propItem) => {
            const prefix = name.substring(0, name.length - 3);
            let suffix = name.substring(name.length - 3);
            if (suffix === `[${indexItem - 1}]`) {
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
      } else if (typeof valueDataByTree === 'object') {
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
        name = koala(name)
          .string()
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
        if (Array.isArray(data[index])) {
          data[index].forEach((item, indexItem) => {
            clone(Object.keys(item)).forEach((propItem) => {
              name = this.generateAutofillDataTree(
                item,
                `${index}[${indexItem}].${propItem}`
              );
            });
          });
        } else if (typeof data[index] === 'object') {
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
}
