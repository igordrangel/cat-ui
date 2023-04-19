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
import { klDelay } from '@koalarx/utils/operators/delay';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Directive()
export abstract class FieldBase<FormFieldType, ElInputType extends HTMLElement>
  implements OnInit, OnDestroy
{
  @Input() control?: FormControl;
  @Input() fieldConfig?: CatFormFieldConfig & FormFieldType;

  @ViewChild('inputElement')
  elInput?: ElementRef<ElInputType>;

  public updateComponent$ = new BehaviorSubject<boolean>(true);

  protected destroySubscriptions$ = new Subject<boolean>();

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
      while (!this.elInput) await klDelay(300);
      this.elInput?.nativeElement?.focus();
    }
  }
}
