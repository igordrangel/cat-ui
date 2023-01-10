import { CatDynamicComponent } from "@catrx/ui/dynamic-component";
import { ChipComponent } from "./chip.component";
import { CatChipColor, CatChipConfig } from "./chip.interface";

export class CatChip extends CatDynamicComponent {
  constructor(text: string, color?: CatChipColor) {
    super(ChipComponent, {text, color} as CatChipConfig);
  }
}
