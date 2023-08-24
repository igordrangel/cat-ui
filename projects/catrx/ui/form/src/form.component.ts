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
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { toCamelCase } from '@koalarx/utils/operators/string';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { first } from 'rxjs/internal/operators/first';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import {
  CatFormConfig
} from './builder/form.interface';
import { FormService } from './form.service';

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

  constructor(
    private fb: FormBuilder,
    private formService: FormService
  ) { }

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
        this.config.behavior.setValues(
          this.formService.getAutofillDataTree(this.config)
        ).send();
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
    if (this.dynamicForm) {
      const controlName = toCamelCase(legend);

      if (this.dynamicForm.controls[controlName]) {
        this.dynamicForm.removeControl(controlName)
      }

      this.dynamicForm.addControl(controlName, formGroup);
    }
  }

  public addFormControl(name: string, formControl: FormControl) {
    if (this.dynamicForm) {
      const controlName = toCamelCase(name);

      if (this.dynamicForm.controls[controlName]) {
        this.dynamicForm.removeControl(controlName)
      }

      this.dynamicForm.addControl(controlName, formControl);
    }
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
}
