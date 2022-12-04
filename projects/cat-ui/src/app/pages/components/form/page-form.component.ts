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
               .fieldset('Dados Gerais', builder => builder
                 .build()
                 .inputText('name', builder => builder
                   .input('Nome')
                   .grid(3)
                   .focus()
                   .setValidators([Validators.required])
                   .generate()
                 )
                 .generate()
               )
               .onChange(data => console.log(data))
               .onSubmit(data => console.log(data))
               .generate();

  constructor(private formService: CatFormService) {
  }
}
