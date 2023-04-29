import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { CatFormConfig, CatFormFieldConfig, CatFormSelectOptions } from "@catrx/ui/form";
import { FilterConfig, FilterOption } from "../factory/filter-options.types";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { FormControl } from "@angular/forms";
import { startWith } from "rxjs";

@Component({
  templateUrl: './trigger.component.html'
})
export class TriggerComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() config: FilterConfig;

  activeFilterForm?: CatFormConfig<any>;
  filteredOptions: FilterOption[] = [];
  filterOptionsControl = new FormControl();

  private destroySubscriptions$ = new Subject<boolean>();

  ngOnDestroy(): void {
    this.activeFilterForm = undefined;
    this.destroySubscriptions$.next(true);
  }

  ngOnInit(): void {
    this.observeOnChangeField();

    this.filterOptionsControl
      .valueChanges
      .pipe(
        startWith(''),
        takeUntil(this.destroySubscriptions$),
        debounceTime(300)
      )
      .subscribe(value => {
        this.filteredOptions = this.config.options.filter(
          option => this.getOptionConfig(option).fieldConfig.name.includes(value)
        );
      })
  }

  chooseOption(option: FilterOption) {
    setTimeout(() => {
      const optionConfig = this.getOptionConfig(option);

      optionConfig.fieldConfig.onChange = async (value) => {
        let selectedOptions = this.config.selectedOptions.getValue();
        const selectedOptionIndex = selectedOptions.findIndex(option =>
          option.name === optionConfig.fieldConfig.name
        );

        if (selectedOptionIndex >= 0 && !Array.isArray(value)) {
          selectedOptions[selectedOptionIndex] = {
            ...selectedOptions[selectedOptionIndex],
            previewValue: await this.getPreviewValue(optionConfig.fieldConfig, value),
            value
          }
        } else if (Array.isArray(value)) {
          if (selectedOptionIndex >= 0)
            selectedOptions = selectedOptions.filter(option =>
              option.name === optionConfig.fieldConfig.name &&
              !value.includes(option.value)
            );

          for (const item of (value as any[])) {
            selectedOptions.push({
              icon: option.icon,
              label: optionConfig.fieldConfig.label,
              name: optionConfig.fieldConfig.name,
              previewValue: await this.getPreviewValue(optionConfig.fieldConfig, item),
              value: item
            });
          }
        } else {
          selectedOptions.push({
            icon: option.icon,
            label: optionConfig.fieldConfig.label,
            name: optionConfig.fieldConfig.name,
            previewValue: await this.getPreviewValue(optionConfig.fieldConfig, value),
            value
          });
        }

        this.config.selectedOptions.next(selectedOptions);
      }

      this.activeFilterForm = optionConfig.formConfig;
    }, 50)
  }

  back() {
    setTimeout(() => {
      this.activeFilterForm = undefined;
    }, 50)
  }

  getOptionConfig(option: FilterOption) {
    const formConfig = option.formBuilder.generate()

    if (formConfig.formElements.length === 0)
      throw new Error('Você deve informar um campo.');
    if (formConfig.formElements.length > 1)
      throw new Error('Só é permitida a inclusão de apenas um campo.');

    return {
      formConfig,
      fieldConfig: formConfig.formElements[0].field
    };
  }

  private async getPreviewValue(fieldConfig: CatFormFieldConfig, value: any) {
    switch (fieldConfig.type) {
      case "date":
      case "datetime-local":
      case "time":
        return value;
      case "select":
      case "autocomplete":
      case "checkbox":
      case "radio":
        const options = await firstValueFrom((fieldConfig as CatFormSelectOptions).options);
        return options.find(option => option.value === value)?.name;
      case "file":
      case "csv":
        throw new Error('Tipo de campo não suportado');
      case "number":
      case "text":
      case "search":
      case "password":
      case "email":
      case "url":
      case "textarea":
      case "cpf":
      case "cnpj":
      default:
        return value;
    }
  }

  private observeOnChangeField() {
    if (this.config.onChange) {
      this.config.selectedOptions
        .pipe(
          takeUntil(this.destroySubscriptions$),
          debounceTime(300)
        )
        .subscribe(selectedOptions => {
          const payload = {};

          selectedOptions.forEach(option => {
            const optionsByName = selectedOptions.filter(filteredOption => filteredOption.name === option.name);
            if (optionsByName.length > 1) {
              payload[option.name] = optionsByName.map(opt => opt.value);
            } else {
              payload[option.name] = option.value;
            }
          })

          this.config.onChange(payload);
        })
    }
  }
}