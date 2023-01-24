import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CatFormFieldConfig } from '../../../builder/form.interface';
import { delay } from '@koalarx/utils/operators/delay';
import { Subject, takeUntil, BehaviorSubject } from 'rxjs';

@Directive()
export abstract class FieldBase<FormFieldType, ElInputType extends HTMLElement>
  implements OnInit, OnDestroy
{
  @Input() control?: FormControl;
  @Input() fieldConfig?: CatFormFieldConfig & FormFieldType;

  @ViewChild('inputElement')
  elInput?: ElementRef<ElInputType>;

  public updateComponent$ = new BehaviorSubject<boolean>(true);

  private destroySubscriptions$ = new Subject<boolean>();

  ngOnDestroy() {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit() {
    this.focus().then();
    this.customInit();

    if (this.fieldConfig && this.fieldConfig.behavior) {
      this.fieldConfig.behavior.subject
        .pipe(takeUntil(this.destroySubscriptions$))
        .subscribe(() => {
          this.updateComponent$.next(true);
        });
    }
  }

  protected customInit() {
    return;
  }

  private async focus() {
    if (this.fieldConfig?.focus) {
      while (!this.elInput) await delay(300);
      this.elInput?.nativeElement?.focus();
    }
  }
}
