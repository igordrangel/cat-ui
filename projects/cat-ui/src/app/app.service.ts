import { Injectable } from '@angular/core';
import { AppConfigMenu, AppNotification, CatAppDecodedToken } from '@catrx/ui/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'any' })
export class AppService {
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
    {
      id: 4,
      title: 'Notificação de Push',
      message: 'Clique para ir até a tela de Formulários Dinâmicos.',
      notifyOnBrowser: true,
    },
  ];

  public getNotifications() {
    return new Observable<AppNotification[]>((observe) => {
      setTimeout(() => {
        observe.next(this.notifications);
      }, 300);
    });
  }

  public deleteNotification(id: number) {
    return new Observable((observe) => {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== id
      );
      observe.next(null);
    });
  }

  public deleteNotifications(ids: number[]) {
    return new Observable((observe) => {
      this.notifications = this.notifications.filter(
        (notification) => ids.indexOf(notification.id) < 0
      );
      observe.next(null);
    });
  }

  public getMenu(decodedToken: CatAppDecodedToken) {
    return new Observable<AppConfigMenu>((observe) => {
      observe.next({
        modules: [
          {
            icon: 'fa-solid fa-database',
            name: 'Exibição de Dados',
            tools: [
              {
                name: 'Datatable',
                hasPermission: () => true,
                routerLink: '/components/datatable',
              },
              {
                name: 'Componentes Dinâmicos',
                hasPermission: () => true,
                routerLink: '/components/dynamic-components',
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
                routerLink: '/components/form',
              },
            ],
          },
          {
            icon: 'fa-solid fa-bars-progress',
            name: 'Menu',
            tools: [
              {
                name: 'Toolbar',
                hasPermission: () => true,
                routerLink: '/components/toolbar',
              },
            ],
          },
          {
            icon: 'fa-regular fa-window-restore',
            name: 'Janelas e Alertas',
            tools: [
              {
                name: 'Dialog',
                hasPermission: () => true,
                routerLink: '/components/dialog',
              },
              {
                name: 'Confirm',
                hasPermission: () => true,
                routerLink: '/components/confirm',
              },
            ],
          },
          {
            icon: 'fa-solid fa-file-arrow-down',
            name: 'Exportação e Download de Dados',
            tools: [
              {
                name: '.csv',
                hasPermission: () => true,
                routerLink: '/services/csv',
              },
            ],
          },
          {
            icon: 'fa-solid fa-book',
            name: 'Guias',
            tools: [
              {
                name: 'Página de CRUD',
                hasPermission: () => true,
                routerLink: '/guides/crud-page',
              },
            ],
          },
        ],
      });
    });
  }
}
