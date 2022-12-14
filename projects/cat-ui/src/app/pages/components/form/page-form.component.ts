import { Component } from '@angular/core';
import { CatFormService } from '@cat-ui/form';
import { Subject } from 'rxjs';
import { nameValidator } from './validators/name.validator';

@Component({
  templateUrl: 'page-form.component.html'
})
export class PageFormComponent {
  isFormValid = false;
  submit = new Subject<boolean>();
  config = this.formService
    .build()
    .fieldset('Dados Gerais', 'dadosGerais', (builder) =>
      builder
        .text('Nome', 'name', (builder) =>
          builder
            .setHint('Informe <b>TESTE</b> para desbloquear o sobrenome')
            .grid(6)
            .focus()
            .setRequired()
            .setMinLength(5)
            .setValidators([nameValidator])
            .onChange((value, behavior) => {
              if (value === 'teste') {
                behavior.next({
                  enableFields: ['dadosGerais.lastname']
                });
              } else {
                behavior.next({
                  disableFields: ['dadosGerais.lastname']
                });
              }
            })
            .generate()
        )
        .text('Sobrenome', 'lastname', (builder) =>
          builder.grid(6).disabled().setRequired().generate()
        )
        .number('Idade', 'age', (builder) =>
          builder
            .setRequired()
            .setMin(18)
            .setMax(20)
            .setHint('Apenas entre 18 e 20 anos')
            .grid(3)
            .generate()
        )
        .date('Data de Nascimento', 'birthDate', (builder) =>
          builder
            .grid(3)
            .setMin('2022-12-01')
            .setMax('2022-12-23')
            .setRequired()
            .generate()
        )
        .generate()
    )
    .textarea('Descrição', 'description', (builder) =>
      builder.setRequired().generate()
    )
    // .onChange(data => console.log(data))
    .onSubmit((data) => console.log(data))
    .generate();

  constructor(private formService: CatFormService) {}
}
