import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatChip } from '@catrx/ui/chip';

@Component({
  templateUrl: './page-chip.component.html',
})
export class PageChipComponent extends CatComponentBase {
  chipWithDynamicComponent = new CatChip('Componente Dinâmico', 'success');
}
