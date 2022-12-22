import { Component } from '@angular/core';
import { CatAppService } from '@catrx/ui/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  appConfig = this.appService
    .build('Cat UI', {
      mode: 'openId',
      service: 'google',
      onAuth: (decodedToken) => new Observable<boolean>(observe => {
        console.log(decodedToken);
        observe.next(true);
      }),
    })
    .setLogotype({
      default: '../assets/logotype.svg',
      negative: '../assets/logotype-negative.svg',
    })
    .enableDarkMode()
    .setSideMenu({
      modules: [
        {
          icon: 'fa-solid fa-database',
          name: 'Exibição de Dados',
          tools: [
            {
              name: 'Datatable',
              hasPermission: true,
              routerLink: './components/datatable',
            },
            {
              name: 'Componentes Dinâmicos',
              hasPermission: true,
              routerLink: './components/dynamic-components',
            },
          ],
        },
        {
          icon: 'fa-brands fa-wpforms',
          name: 'Formulário',
          tools: [
            {
              name: 'Formulário Dinâmico',
              hasPermission: true,
              routerLink: './components/form',
            },
          ],
        },
      ],
    })
    .generate();

  constructor(private appService: CatAppService) {}
}
