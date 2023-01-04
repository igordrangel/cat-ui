import { Component } from '@angular/core';
import { CatFormBase } from '@catrx/ui/common';
import { CatFormService } from '@catrx/ui/form';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './page-list-item.component.html',
  styles: [
    `
      form {
        display: block;
        margin: 15px 20px;
      }
    `,
  ],
})
export class PageListItemComponent extends CatFormBase {
  config = this.formService
    .build()
    .listsItem('Contatos', 'phones', (builder) =>
      builder
        .text('Telefone', 'phone', (builder) =>
          builder.setMask('(00)00000000?0').setRequired().generate()
        )
        .generate(),
      {minItems: 1, maxItems: 5}
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
