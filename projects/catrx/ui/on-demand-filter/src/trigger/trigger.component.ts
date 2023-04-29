import { Component, Input } from "@angular/core";
import { CatFormConfig } from "@catrx/ui/form";
import { FilterConfig, FilterOption } from "../factory/filter-options.types";
import { Observable } from "rxjs";
import { klObject } from "@koalarx/utils/operators/object";

@Component({
  selector: 'cat-on-demand-filter-trigger[label][config]',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.css']
})
export class TriggerComponent {
  @Input() label: string;
  @Input() config: FilterConfig;

  activeFilterForm?: CatFormConfig<any>;
  payloadFilter = {};

  chooseOption(option: FilterOption) {
    setTimeout(() => {
      this.activeFilterForm = option.formConfig
        .onChange(data => {
          this.payloadFilter = klObject(this.payloadFilter)
            .merge(data)
            .getValue()
        })
        .generate()
    }, 50)
  }

  back() {
    setTimeout(() => {
      this.activeFilterForm = undefined;
    }, 50)
  }
}