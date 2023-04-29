import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { SelectedOptions } from "../factory/filter-options.types";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Component({
  templateUrl: './selected-options.component.html'
})
export class SelectedOptionsComponent {
  @Input() selectedOptions$: BehaviorSubject<SelectedOptions[]>;

  remove(index: number) {
    const selectedOptions: SelectedOptions[] = Object.assign(this.selectedOptions$.getValue());
    selectedOptions.splice(index, 1);
    this.selectedOptions$.next(selectedOptions);
  }
}