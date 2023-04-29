import { Component } from "@angular/core";
import { CatComponentBase } from "@catrx/ui/common";
import { CatFormService } from "@catrx/ui/form";
import { CatOnDemandFilterService } from "@catrx/ui/on-demand-filter/src/cat-on-demand-filter.service";

@Component({
  templateUrl: './page-on-demand-filter.component.html'
})
export class PageOnDemandFilterComponent extends CatComponentBase {
  filterConfig = this.onDemandFilterService
    .build()
    .setOption({
      icon: 'fa-regular fa-circle',
      name: 'Status',
      formConfig: this.formService
        .build()
        .select('Status', 'status', builder => builder
          .setOptions([
            { name: 'Ativo', value: true },
            { name: 'Inativo', value: true }
          ])
          .generate()
        )
    })
    .generate();

  constructor(
    private onDemandFilterService: CatOnDemandFilterService,
    private formService: CatFormService) {
    super();
  }
}