import { Directive, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormComponent } from '@catrx/ui/form';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { CatComponentBase } from './cat-component.base';
import { takeUntil } from 'rxjs';

@Directive()
export abstract class CatFormBase
  extends CatComponentBase
  implements OnInit, OnDestroy
{
  public submitLoader$ = new BehaviorSubject<boolean>(false);

  private destroySubscriptions$ = new Subject<boolean>();

  @ViewChild('form', { static: true }) protected elForm?: FormComponent;

  ngOnDestroy(): void {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit(): void {
    this.elForm.submitted
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe((submitted) => {
        if (submitted) {
          this.submit();
        }
      });
  }

  public submit(event?: Event) {
    event?.preventDefault();
    if (!this.submitLoader$.getValue()) {
      this.elForm?.submit(
        () => this.submitLoader$.next(true),
        () => this.submitLoader$.next(false),
        () => this.submitLoader$.next(false)
      );
    }
  }
}
