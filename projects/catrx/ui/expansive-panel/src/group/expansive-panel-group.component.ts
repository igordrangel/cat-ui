import { Component, Input } from '@angular/core';

@Component({
  selector: 'cat-expansive-panel-group',
  templateUrl: './expansive-panel-group.component.html',
})
export class ExpansivePanelGroupComponent {
  @Input() multi = false;
}
