import { Component, Input } from '@angular/core';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { first } from 'rxjs/internal/operators/first';
import {
  CatFormAutocompleteOptions,
  CatFormListOptions,
} from '../../../../builder/form.interface';
import { FieldBase } from '../field.base';
import { CatSelectOption } from './../../../../common/cat-select-option';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'cat-field-autocomplete[control][fieldConfig]',
  templateUrl: 'input-autocomplete.component.html',
})
export class InputAutocompleteComponent extends FieldBase<
  CatFormAutocompleteOptions,
  HTMLSelectElement
> {
  loaderText = 'Carregando...';
  loading$ = new BehaviorSubject<boolean>(true);
  @Input() options$ = new BehaviorSubject<CatFormListOptions[]>(null);

  private search$ = new Subject<string>();

  public searchOnType(text: string) {
    if (!(this.fieldConfig.options instanceof Observable)) {
      this.options$.next([]);
      this.loading$.next(true);
      this.search$.next(text);
    }
  }

  public getAddOptionDynamicComponent(searchTerm: string) {
    return new CatDynamicComponent(
      this.fieldConfig.addOption.customTemplate,
      searchTerm
    );
  }

  public setNewOption(fieldConfig: CatFormAutocompleteOptions) {
    return (value: any) => {
      if (fieldConfig.addOption?.persistService) {
        this.loaderText = 'Enviando...';
        this.loading$.next(true);
        return new Promise((resolve, reject) => {
          fieldConfig.addOption
            .persistService(value)
            .pipe(first())
            .subscribe({
              next: (response) => {
                this.loading$.next(false);
                this.loaderText = 'Carregando...';
                resolve(response);
              },
              error: (err) => {
                this.loading$.next(false);
                this.loaderText = 'Carregando...';
                reject(err);
              },
            });
        });
      } else {
        this.control?.setValue(value);
        return value;
      }
    };
  }

  public optionIsComponent(option: CatFormListOptions) {
    return option.name instanceof CatSelectOption;
  }

  public getCompomentOption(option: CatFormListOptions) {
    return option.name as CatSelectOption;
  }

  protected override customInit() {
    const options = this.fieldConfig.options ?? this.options$;

    if (options instanceof Observable) {
      this.updateList(options);
    } else if (typeof options === 'function') {
      this.updateList(options());
    } else {
      this.updateList(new Observable(observe => {
        observe.next(options ?? []);
        observe.complete();
      }));
    }

    this.search$.pipe(debounceTime(300)).subscribe((text) => {
      if (typeof options === 'function') {
        this.updateList(options(text));
      }
    });
  }

  private updateList(requester: Observable<CatFormListOptions[]>) {
    requester.pipe(takeUntil(this.destroySubscriptions$)).subscribe({
      next: (response) => {
        this.options$.next(response ?? []);
        this.loading$.next(!response);
        this.updateComponent$.next(true);
      },
      error: () => {
        this.options$.next([]);
        this.loading$.next(false);
        this.updateComponent$.next(true);
      },
    });
  }
}
