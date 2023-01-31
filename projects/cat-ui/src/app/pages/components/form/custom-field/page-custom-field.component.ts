import { Component } from '@angular/core';
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
export class PageCustomFieldComponent extends CatFormBase {
  config = this.formService
    .build({ customField: 'teste' })
    .customField(
      'Campo personalizado',
      'customField',
      CustomFieldExampleComponent,
      (field) => field.setRequired().generate()
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
}
