import { Component, Input } from '@angular/core';

@Component({
  selector: 'cat-step[label]',
  templateUrl: './stepper-item.component.html',
})
export class StepperItemComponent {
  @Input() label: string;
}
