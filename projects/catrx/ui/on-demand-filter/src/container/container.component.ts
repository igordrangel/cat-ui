import { Component } from "@angular/core";

@Component({
  selector: 'cat-on-demand-filter-container',
  template: `
    <div class="cat-on-demand-filter-container">
      <ng-content />
    </div>`
})
export class ContainerComponent { }