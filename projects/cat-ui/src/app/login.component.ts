import { Component } from '@angular/core';
import { CatLogotypeApp, CatTokenService } from '@catrx/ui';
import { CatFormModule, CatFormService } from '@catrx/ui/form';
import {
  CatDynamicComponentDataInterface,
  CatDynamicComponentModule,
} from '@catrx/ui/dynamic-component';
import { Observable } from 'rxjs';
import { CatFormBase } from '@catrx/ui/common';
import { CommonModule } from '@angular/common';
import { CatButtonModule } from '@catrx/ui/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CatDynamicComponentModule,
    CatFormModule,
    CatButtonModule,
  ],
  template: `
    <form class="login-content" (submit)="submit($event)">
      <cat-dynamic-component class="logotype" [component]="data" />

      <cat-form #form [config]="loginFormConfig" />

      <button
        catButton="primary"
        [showLoader]="submitLoader$ | async"
        class="w-100"
        type="submit"
      >
        Entrar
      </button>
    </form>
  `,
  styles: [
    '.login-content { width: 250px; }',
    '.logotype { display: flex; justify-content: center; margin: 0 0 40px; } ',
  ],
})
export class LoginComponent
  extends CatFormBase
  implements CatDynamicComponentDataInterface {
  data: CatLogotypeApp;

  loginFormConfig = this.formService
    .build<any>()
    .text('Usuário', 'login', (builder) =>
      builder.focus().setRequired().generate()
    )
    .password('Senha', 'password', (builder) =>
      builder.setRequired().generate()
    )
    .onSubmit(
      (data) =>
        new Observable((observe) => {
          setTimeout(() => {
            this.tokenService.setDecodedToken(
              {
                ...data,
                exp: Date.now(),
              },
              'demo'
            );
            observe.next();
            observe.complete();
          }, 1000);
        })
    )
    .generate();

  constructor(
    private formService: CatFormService,
    private tokenService: CatTokenService
  ) {
    super();
  }
}
