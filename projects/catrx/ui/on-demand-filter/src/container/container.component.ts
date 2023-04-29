import { Component } from "@angular/core";

@Component({
  selector: 'cat-on-demand-filter-container',
  template: `
    <div class="cat-on-demand-filter-container">
      <ng-content select='[trigger-container]'></ng-content>
      <ng-content select='[selected-options]'></ng-content>
    </div>`
})
export class ContainerComponent { }