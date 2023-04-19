import { Component, OnInit } from '@angular/core';
import { CatFormBase } from '@catrx/ui/common';
import { CatFormService } from '@catrx/ui/form';
import { Observable } from 'rxjs/internal/Observable';
import { CustomFieldExampleComponent } from './custom-field-example/custom-field-example.component';

@Component({
  templateUrl: './page-custom-field.component.html',
  styles: [
    `
      form {
        display: block;
        margin: 15px 20px;
      }
    `,
  ],
})
export class PageCustomFieldComponent extends CatFormBase implements OnInit {
  config = this.formService
    .build({ customField: 'teste' })
    .customField(
      'Campo personalizado',
      'customField',
      CustomFieldExampleComponent,
      (field) => field.setRequired().generate()
    )
    .checkbox('Exibir Lista', 'showList', (builder) =>
      builder
        .onChange((value: boolean, behavior) => {
          if (value) {
            behavior.showFields(['test']);
          } else {
            behavior.hideFields(['test']);
          }
          behavior.send();
        })
        .generate()
    )
    .listsItem(
      'Teste',
      'test',
      (builder) =>
        builder
          .text('Valor da Regra', 'value', (builder) =>
            builder.setRequired().generate()
          )
          .generate(),
      { minItems: 1 }
    )
    .onSubmit(
      (data) =>
        new Observable((observe) => {
          setTimeout(() => {
            console.log(data);
            observe.next();
            observe.complete();
          }, 1000);
        })
    )
    .generate();

  constructor(private formService: CatFormService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.config.behavior.hideFields(['test']).send();
  }
}
