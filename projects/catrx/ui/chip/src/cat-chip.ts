import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { CatChipComponent } from './cat-chip.component';
import { CatChipColor, CatChipConfig } from './chip.interface';

export class CatChip extends CatDynamicComponent {
  constructor(text: string, color?: CatChipColor) {
    super(CatChipComponent, { text, color } as CatChipConfig);
  }
}
