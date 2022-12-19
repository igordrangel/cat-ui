import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatDynamicComponent } from '../../../../../../../dynamic-component/src/lib/cat-dynamic-component';
import {
  CatFormListOptions,
  CatFormAutocompleteOptions,
} from '../../../../builder/form.interface';
import {
  BehaviorSubject,
  Observable,
  first,
  debounceTime,
  Subject,
} from 'rxjs';

@Component({
  selector: 'cat-field-autocomplete[control][fieldConfig]',
  templateUrl: 'input-autocomplete.component.html',
  styleUrls: ['../../field.component.css'],
})
export class InputAutocompleteComponent extends FieldBase<
  CatFormAutocompleteOptions,
  HTMLSelectElement
> {
  loaderText = 'Carregando...';
  loading$ = new BehaviorSubject<boolean>(true);
  options$ = new BehaviorSubject<CatFormListOptions[]>([]);

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

  protected override customInit() {
    if (this.fieldConfig.options instanceof Observable) {
      this.updateList(this.fieldConfig.options);
    } else {
      this.updateList(this.fieldConfig.options());
    }

    this.search$.pipe(debounceTime(300)).subscribe((text) => {
      if (!(this.fieldConfig.options instanceof Observable)) {
        this.updateList(this.fieldConfig.options(text));
      }
    });
  }

  private updateList(requester: Observable<CatFormListOptions[]>) {
    requester.pipe(first()).subscribe({
      next: (response) => {
        this.options$.next(response);
        this.loading$.next(false);
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
