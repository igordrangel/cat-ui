import { Directive, ViewChild } from "@angular/core";
import { FormComponent } from "@catrx/ui/form";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Directive()
export abstract class CatFormBase {
  public submitLoader$ = new BehaviorSubject<boolean>(false);

  @ViewChild('form', { static: true }) private elForm?: FormComponent;

  public submit(event: Event) {
    event.preventDefault();
    this.elForm?.submit(
      () => this.submitLoader$.next(true),
      () => this.submitLoader$.next(false),
      () => this.submitLoader$.next(false)
    );
  }
}
