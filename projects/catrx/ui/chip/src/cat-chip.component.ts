import { Component, Input } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';
import { CatChipConfig, CatChipColor } from './chip.interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'cat-chip',
  template: `
    <div class="cat-chip" [ngClass]="data?.color ?? color">
      <ng-container *ngIf="data; else defaultContent">
        <span [innerHTML]="data.text"></span>
      </ng-container>

      <ng-template #defaultContent>
        <ng-content></ng-content>
      </ng-template>
    </div>
  `
})
export class CatChipComponent implements CatDynamicComponentDataInterface {
  @Input() color: CatChipColor = 'primary';

  public data?: CatChipConfig;
}
