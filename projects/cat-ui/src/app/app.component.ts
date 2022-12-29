import { Component } from '@angular/core';
import { CatAppService } from '@catrx/ui/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppConfigMenu } from '../../../core/src/lib/factory/app-config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  appConfig = this.appService
    .build('Cat UI', {
      autoAuth: false,
      mode: 'openId',
      service: 'google',
      onAuth: (decodedToken) => new Observable<AppConfigMenu>(observe => {
        observe.next({
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
        });
      }),
    })
    .setLogotype({
      default: '../assets/logotype.svg',
      negative: '../assets/logotype-negative.svg',
    })
    .enableDarkMode()
    .generate();

  constructor(private appService: CatAppService) {}
}
