import { Component, Input } from '@angular/core';

@Component({
  selector: 'cat-expansive-panel-group',
  templateUrl: './expansive-panel-group.component.html',
  styleUrls: ['./expansive-panel-group.component.css'],
})
export class ExpansivePanelGroupComponent {
  @Input() multi = false;
}
