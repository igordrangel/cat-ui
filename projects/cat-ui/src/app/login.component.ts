import { Component } from '@angular/core';
import { CatLogotypeApp, CatTokenService } from '@catrx/ui/core';
import { CatFormModule, CatFormService } from '@catrx/ui/form';
import { CatDynamicComponentDataInterface, CatDynamicComponentModule } from '@catrx/ui/dynamic-component';

@Component({
  template: `
    <div class="login-content">
      <cat-dynamic-component
        class="logotype"
        [component]="data"
      ></cat-dynamic-component>

      <cat-form #form [config]="loginFormConfig"></cat-form>

      <button (click)="form.submit()" class="w-100 text-center btn btn-primary">
        Entrar
      </button>
    </div>
  `,
  styles: [
    `
      .login-content {
        width: 250px;
      }
      .logotype {
        display: block;
        width: 100px;
        height: 100px;
        margin: 0 auto 20px;
      }
    `,
  ],
  standalone: true,
  imports: [CatDynamicComponentModule, CatFormModule],
})
export class LoginComponent implements CatDynamicComponentDataInterface {
  data: CatLogotypeApp;

  loginFormConfig = this.formService
    .build()
    .text('Usuário', 'login', (builder) => builder.setRequired().generate())
    .password('Senha', 'password', (builder) =>
      builder.setRequired().generate()
    )
    .onSubmit((data) => this.tokenService.setDecodedToken(data, 'demo'))
    .generate();

  constructor(
    private formService: CatFormService,
    private tokenService: CatTokenService
  ) {}
}
