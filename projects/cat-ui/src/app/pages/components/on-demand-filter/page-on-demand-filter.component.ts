import { Component } from "@angular/core";
import { CatComponentBase } from "@catrx/ui/common";
import { CatOnDemandFilterService } from "@catrx/ui/on-demand-filter/src/cat-on-demand-filter.service";

@Component({
  templateUrl: './page-on-demand-filter.component.html'
})
export class PageOnDemandFilterComponent extends CatComponentBase {
  filterConfig = this.onDemandFilterService
    .build()
    .setOption((formBuilder) => formBuilder
      .select('Status', 'status', builder => builder
        .setOptions([
          { name: 'Ativo', value: true },
          { name: 'Inativo', value: false }
        ])
        .generate()
      ), 'fa-regular fa-circle')
    .onChange(data => console.log(data))
    .generate();

  constructor(private onDemandFilterService: CatOnDemandFilterService) {
    super();
  }
}