import { Component } from '@angular/core';
import { AppNotification, CatAppService } from '@catrx/ui/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private notifications: AppNotification[] = [
    {
      id: 1,
      title: 'Notificação de Demonstração',
      message: 'Clique para ir até a tela de Formulários Dinâmicos.',
      notifyOnBrowser: false,
      routerLink: '/components/form',
    },
    {
      id: 2,
      title: 'Notificação de Demonstração',
      message: 'Clique para ir até a tela de Datatable.',
      notifyOnBrowser: false,
      routerLink: '/components/datatable',
    },
    {
      id: 3,
      title: 'Notificação de Demonstração',
      message: 'Esta notificação não possui ação de clique.',
      notifyOnBrowser: false,
    },
  ];

  appConfig = this.appService
    .build('Cat UI', {
      autoAuth: false,
      mode: 'openId',
      service: 'google',
      onAuth: (decodedToken) =>
        new Observable((observe) => {
          observe.next({
            modules: [
              {
                icon: 'fa-solid fa-database',
                name: 'Exibição de Dados',
                tools: [
                  {
                    name: 'Datatable',
                    hasPermission: () => true,
                    routerLink: './components/datatable',
                  },
                  {
                    name: 'Componentes Dinâmicos',
                    hasPermission: () => true,
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
                    hasPermission: () => true,
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
    .pushNotifications({
      getNotifications: new Observable((observe) => {
        setTimeout(() => {
          observe.next(this.notifications);
        }, 300);
      }),
      getPermissionToNotifyOnBrowser: true,
      intervalToGet: 5000,
      onDelete: (id) =>
        new Observable((observe) => {
          this.notifications = this.notifications.filter(
            (notification) => notification.id !== id
          );
          observe.next(null);
        }),
      onAllDelete: (ids) =>
        new Observable((observe) => {
          this.notifications = this.notifications.filter(
            (notification) => ids.indexOf(notification.id) < 0
          );
          observe.next(null);
        }),
    })
    .enableDarkMode()
    .generate();

  constructor(private appService: CatAppService) {}
}
