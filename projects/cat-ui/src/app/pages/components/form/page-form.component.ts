import { Component } from "@angular/core";
import { CatFormService } from "@cat-ui/form";
import { Subject } from "rxjs";
import { Validators } from "@angular/forms";

@Component({
  templateUrl: 'page-form.component.html'
})
export class PageFormComponent {
  isFormValid = false;
  submit = new Subject<boolean>();
  config = this.formService
               .build()
               .fieldset('Dados Gerais', 'dadosGerais', builder => builder
                 .inputText('name', builder => builder
                   .input('Nome')
                   .grid(3)
                   .focus()
                   .setValidators([Validators.required])
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
                 .inputText('lastname', builder => builder
                   .input('Sobrenome')
                   .grid(3)
                   .disabled()
                   .setValidators([Validators.required])
                   .onChange((value, behavior) => {
                     if (value === 'teste') {
                       behavior.next({
                         showFields: ['description']
                       });
                     } else {
                       behavior.next({
                         hideFields: ['description']
                       });
                     }
                   })
                   .generate()
                 )
                 .generate()
               )
               .inputText('description', builder => builder
                 .input('Descrição')
                 .hidden()
                 .setValidators([Validators.required])
                 .generate()
               )
               // .onChange(data => console.log(data))
               .onSubmit(data => console.log(data))
               .generate();

  constructor(private formService: CatFormService) {
  }
}
