import { Component } from '@angular/core';
import { CatFormBase } from '@catrx/ui/common';
import { CatFormService } from '@catrx/ui/form';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  templateUrl: './page-list-item.component.html',
  styles: [
    `
      form {
        display: block;
        margin: 15px 0;
      }
    `,
  ],
})
export class PageListItemComponent extends CatFormBase {
  config = this.formService
    .build({
      phones: [
        {
          phone: '(22)999999999',
          emails: [
            { email: 'teste@exemplo.com' },
            { email: 'teste2@exemplo.com' },
          ],
        },
        { phone: '(22)888888888' },
      ],
    })
    .listsItem(
      'Contatos',
      'phones',
      (builder) =>
        builder
          .text('Telefone', 'phone', (builder) =>
            builder.setMask({ mask: '(00)00000000?0' }).setRequired().generate()
          )
          .listsItem(
            'Emails',
            'emails',
            (builder) =>
              builder
                .email('E-mail', 'email', (builder) =>
                  builder.setRequired().generate()
                )
                .generate(),
            { minItems: 1, maxItems: 5 }
          )
          .generate(),
      { minItems: 1, maxItems: 5 }
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
