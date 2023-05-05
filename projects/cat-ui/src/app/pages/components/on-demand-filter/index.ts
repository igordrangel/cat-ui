import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatOnDemandFilterModule } from '@catrx/ui/on-demand-filter';
import { CatOnDemandFilterService } from '@catrx/ui/on-demand-filter/src/cat-on-demand-filter.service';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CommonModule, CatToolbarModule, CatOnDemandFilterModule],
  template: `
    <cat-on-demand-filter-container>
      <cat-toolbar [config]="getToolbarInfo(true)" [spaceBetween]="false">
        <nav buttons>
          <div [catOnDemandFilterTrigger]="filterConfig">Buscar</div>
        </nav>
      </cat-toolbar>

      <div
        [catOnDemandFilterSelectedOptions]="filterConfig.selectedOptions"
      ></div>
    </cat-on-demand-filter-container>
  `,
})
export class PageOnDemandFilterComponent extends CatComponentBase {
  filterConfig = this.onDemandFilterService
    .build()
    .setOption(
      (formBuilder) =>
        formBuilder.select('Status', 'status', (builder) =>
          builder
            .setOptions([
              { name: 'Ativo', value: true },
              { name: 'Inativo', value: false },
            ])
            .generate()
        ),
      'fa-regular fa-circle'
    )
    .setOption(
      (formBuilder) =>
        formBuilder.date('Data', 'date', (builder) => builder.generate()),
      'fa-regular fa-calendar'
    )
    .setOption(
      (formBuilder) =>
        formBuilder.time('Hora', 'time', (builder) => builder.generate()),
      'fa-regular fa-clock'
    )
    .setOption(
      (formBuilder) =>
        formBuilder.datetime('Data/Hora', 'datetime', (builder) =>
          builder.generate()
        ),
      'fa-solid fa-clock'
    )
    .onChange((data) => console.log(data))
    .generate();

  constructor(private onDemandFilterService: CatOnDemandFilterService) {
    super();
  }
}
