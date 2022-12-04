import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CatFormConfig } from "./builder/form.interface";
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup } from "@angular/forms";
import { toCamelCase } from "@koalarx/utils/operators/string";
import { debounceTime, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'cat-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  @Input() config?: CatFormConfig<any>;
  @Input() onSubmit?: Subject<boolean>;

  @Output() isValid = new EventEmitter<boolean>();

  public dynamicForm?: UntypedFormGroup;

  @ViewChild('formElement') private elForm?: ElementRef<HTMLFormElement>
  private destroySubscriptions$ = new Subject();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dynamicForm = this.fb.group({});

    if (this.onSubmit) {
      this.onSubmit
          .pipe(takeUntil(this.destroySubscriptions$))
          .subscribe((submit) => {
            if (submit) this.submit()
          });
    }

    if (this.dynamicForm) {
      this.dynamicForm
          .valueChanges
          .pipe(
            takeUntil(this.destroySubscriptions$),
            debounceTime(300)
          )
          .subscribe(() => {
            if (this.config?.onChange) {
              this.config?.onChange(this.getFormData());
            }
            this.isValid.emit(this.dynamicForm?.valid)
          });
    }
  }

  public submit() {
    if (this.config && this.dynamicForm?.valid && this.config.onSubmit) {
      this.config.onSubmit(this.getFormData());
    } else {
      this.elForm?.nativeElement?.classList.add('was-validated');
    }
  }

  public addFormGroup(legend: string, formGroup: FormGroup) {
    this.dynamicForm?.addControl(toCamelCase(legend), formGroup);
  }

  public addFormControl(name: string, formControl: FormControl) {
    this.dynamicForm?.addControl(toCamelCase(name), formControl);
  }

  private getFormData() {
    return this.dynamicForm?.getRawValue();
  }
}
