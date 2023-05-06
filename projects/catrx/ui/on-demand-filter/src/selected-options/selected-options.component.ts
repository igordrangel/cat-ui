import { Component, Input, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SelectedOptions } from '../factory/filter-options.types';

@Component({
  template: `
    <div class="cat-on-demand-filter-selected-options-content animate__animated animate__fadeIn">
      <button
        *ngIf="(selectedOptions$ | async)?.length > 0"
        type="button"
        class="btn-clear"
        catTooltip="Limpar Filtro"
        (click)="selectedOptions$.next([])">
        <i class="fa-solid fa-filter-circle-xmark"></i>
      </button>

      <div
        class="option-content animate__animated animate__fadeIn"
        *ngFor="let option of selectedOptions$ | async; let i = index">
        <span class="label">
          <i *ngIf="option.icon" [class]="option.icon"></i>
          {{ option.label }}
        </span>
        <span class="comparator"> = </span>
        <span class="value">{{ option.previewValue }}</span>
        <span class="btn-remove" catTooltip="Remover Filtro" (click)="remove(i)">
          <i class="fa-solid fa-xmark"></i>
        </span>
      </div>

      <button
        *ngIf="(selectedOptions$ | async)?.length > 0 && submit()"
        type="button"
        class="btn-submit"
        catTooltip="Buscar"
        (click)="(submit())()">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  `
})
export class SelectedOptionsComponent {
  @Input() selectedOptions$: BehaviorSubject<SelectedOptions[]>;
  @Input() submit?: WritableSignal<() => void>;

  remove(index: number) {
    const selectedOptions: SelectedOptions[] = Object.assign(
      this.selectedOptions$.getValue()
    );
    selectedOptions.splice(index, 1);
    this.selectedOptions$.next(selectedOptions);
  }
}
