import { Component, Input } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';
import { CatChipConfig, CatChipColor } from './chip.interface';

@Component({
  selector: 'cat-chip',
  templateUrl: './chip.component.html',
})
export class ChipComponent implements CatDynamicComponentDataInterface {
  @Input() color: CatChipColor = 'primary';

  public data?: CatChipConfig;
}
