import { Component } from '@angular/core';
import { CatFormBehavior, CatFormService } from '@catrx/ui/form';
import { CatFileInterface } from '@catrx/ui/utils';
import { PageFormService } from './page-form.service';
import { nameValidator } from './validators/name.validator';
import { Observable } from 'rxjs/internal/Observable';
import { CatFormBase } from '@catrx/ui/common';

@Component({
  templateUrl: 'page-form.component.html',
  styles: [
    `
      form {
        display: block;
        margin: 15px 20px;
      }
    `,
  ],
})
export class PageFormComponent extends CatFormBase {
  config = this.formService
    .build()
    .fieldset(
      'Autopreencher funcionário por arquivo',
      'autofillFormByFile',
      (builder) =>
        builder
          .csv('importEmployee', (builder) =>
            builder
              .setModel({
                filename: 'MODELO_IMPORTACAO_FUNCIONARIO',
                model: { name: '', lastname: '' },
              })
              .onChange((data: CatFileInterface, behavior) => {
                const employee = data?.csvContent?.[0];
                if (employee) {
                  behavior
                    .setValues([
                      {
                        name: 'personData.name',
                        value: employee['name'],
                      },
                      {
                        name: 'personData.lastname',
                        value: employee['lastname'],
                      },
                    ])
                    .send();
                }
              })
              .generate()
          )
          .generate()
    )
    .fieldset('Dados Pessoais', 'personData', (builder) =>
      builder
        .text('Nome', 'name', (builder) =>
          builder
            .setHint('Informe <b>TESTE</b> para desbloquear o sobrenome')
            .grid(3)
            .focus()
            .setRequired()
            .setMinLength(5)
            .setValidators([nameValidator])
            .onChange((value: string, behavior) => {
              if (value.toLowerCase() === 'teste') {
                behavior.enableFields(['personData.lastname']);
              } else {
                behavior.disableFields(['personData.lastname']);
              }
              behavior.send();
            })
            .generate()
        )
        .text('Sobrenome', 'lastname', (builder) =>
          builder.grid(3).disabled().setRequired().generate()
        )
        .cpf('CPF', 'cpf', (builder) =>
          builder.grid(3).setRequired().generate()
        )
        .date('Data de Nascimento', 'birthDate', (builder) =>
          builder.grid(3).setMax('2002-01-01').setRequired().generate()
        )
        .email('E-mail', 'email', (builder) => builder.grid(6).generate())
        .url('LinkedIn', 'linkedin', (builder) => builder.grid(6).generate())
        .generate()
    )
    .fieldset('Dados Profissionais', 'employeeData', (builder) =>
      builder
        .fieldset('Habilidades', 'skills', (builder) =>
          builder
            .checkbox('NodeJS', 'nodejs', (builder) => builder.generate())
            .checkbox('PHP', 'php', (builder) => builder.generate())
            .checkbox('Angular', 'angular', (builder) => builder.generate())
            .grid(6)
            .isCheckboxGroup()
            .generate()
        )
        .fieldset('Área', 'workArea', (builder) =>
          builder
            .radio('stack', (builder) =>
              builder
                .setOptions([
                  { name: 'FrontEnd', value: 'frontend' },
                  { name: 'BackEnd', value: 'backend' },
                  { name: 'FullStack', value: 'fullstack' },
                ])
                .setValue('backend')
                .generate()
            )
            .grid(6)
            .isCheckboxGroup()
            .generate()
        )
        .file('curriculum', (builder) =>
          builder
            .setIcon('fa-solid fa-paperclip')
            .setBtnText('Anexe o curriculo aqui')
            .setExtensionsAccept(['.pdf'])
            .setRequired()
            .generate()
        )
        .generate()
    )
    .fieldset('Endereço', 'employeeLocation', (builder) =>
      builder
        .text('CEP', 'cep', (builder) =>
          builder
            .grid(3)
            .setMinLength(8)
            .setMaxLength(8)
            .setRequired()
            .onChange((cep, behavior) =>
              this.pageFormService
                .getAddressByZipCode(cep)
                .subscribe((address) => this.fillAddress(address, behavior))
            )
            .generate()
        )
        .text('Logradouro', 'street', (builder) =>
          builder.grid(6).setRequired().setMaxLength(50).generate()
        )
        .text('Bairro', 'district', (builder) =>
          builder.grid(3).setRequired().setMaxLength(30).generate()
        )
        .text('Complemento', 'complement', (builder) =>
          builder.grid(3).setMaxLength(50).generate()
        )
        .number('Número', 'number', (builder) => builder.grid(2).generate())
        .text('Cidade', 'city', (builder) =>
          builder.grid(4).setRequired().setMaxLength(50).generate()
        )
        .autocomplete('Estado', 'state', (builder) =>
          builder
            .setOptions(this.pageFormService.getUFs())
            .grid(3)
            .setRequired()
            .generate()
        )
        .generate()
    )
    .fieldset('Empresa Contratante', 'empresaContratante', (builder) =>
      builder
        .text('Razão Social', 'corporateName', (builder) =>
          builder
            .grid(6)
            .setRequired()
            .setMaxLength(50)
            .setValidators([nameValidator])
            .generate()
        )
        .text('Nome Fantasia', 'lastname', (builder) =>
          builder.grid(3).setMaxLength(30).generate()
        )
        .cnpj('CNPJ', 'cnpj', (builder) =>
          builder.grid(3).setRequired().generate()
        )
        .generate()
    )
    .fieldset('Dados do Contrato', 'contractData', (builder) =>
      builder
        .time('Hora de Entrada', 'startTime', (builder) =>
          builder
            .grid(3)
            .setMin('08:00:00')
            .setMax('18:00:00')
            .setRequired()
            .generate()
        )
        .datetime('Data/Hora Admissão', 'contractDate', (builder) =>
          builder
            .grid(3)
            .setMin('2022-12-01 00:00')
            .setMax('2022-12-23 23:59')
            .setRequired()
            .generate()
        )
        .switcher('Ativo', 'active', (builder) => builder.grid(2).generate())
        .range('Carga horária diária', 'hoursByDay', (builder) =>
          builder.setMin(6).setMax(10).grid(4).generate()
        )
        .generate()
    )
    .fieldset('Dados Bancários', 'bankData', (builder) =>
      builder
        .number('Código do Banco', 'febrabamCode', (builder) =>
          builder.setRequired().setMin(1).setMax(999).grid(3).generate()
        )
        .number('Agência', 'agency', (builder) =>
          builder.setRequired().setMax(999).grid(3).generate()
        )
        .text('Nº da Conta', 'bankNumber', (builder) =>
          builder.setRequired().setMaxLength(8).grid(3).generate()
        )
        .generate()
    )
    .textarea('Descrição', 'description', (builder) =>
      builder.setMaxLength(1000).generate()
    )
    .onSubmit(
      (data) =>
        new Observable((obverve) => {
          console.log(data);
          obverve.next(data);
        })
    )
    .generate();

  constructor(
    private formService: CatFormService,
    private pageFormService: PageFormService
  ) {
    super();
  }

  private fillAddress(address: any, behavior: CatFormBehavior) {
    behavior
      .setValues([
        {
          name: 'employeeLocation.street',
          value: address.logradouro,
        },
        {
          name: 'employeeLocation.district',
          value: address.bairro,
        },
        {
          name: 'employeeLocation.complement',
          value: address.complemento,
        },
        {
          name: 'employeeLocation.city',
          value: address.localidade,
        },
        {
          name: 'employeeLocation.state',
          value: address.uf,
        },
      ])
      .send();
  }
}
