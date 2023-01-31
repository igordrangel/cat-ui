import { Injectable } from '@angular/core';
import {
  AppConfigMenu,
  AppNotification,
  CatAppDecodedToken,
  CatRoutePolice,
} from '@catrx/ui/core';
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
      routerLink: '/components/form',
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
    this.buildPolices(decodedToken);
    return new Observable<AppConfigMenu>((observe) => {
      observe.next({
        modules: [
          {
            icon: 'fa-solid fa-database',
            name: 'Exibição de Dados',
            tools: [
              {
                name: 'Datatable',
                routerLink: '/components/datatable',
              },
              {
                name: 'Componentes Dinâmicos',
                routerLink: '/components/dynamic-components',
              },
              {
                name: 'Chip',
                routerLink: '/components/chip',
              },
            ],
          },
          {
            icon: 'fa-brands fa-wpforms',
            name: 'Formulário',
            routerLink: '/components/form',
            tools: [
              {
                name: 'Lista de Itens',
                routerLink: '/components/form/list-item',
              },
              {
                name: 'Campos personalizados',
                routerLink: '/components/form/custom-field',
              },
              {
                name: 'Stepper',
                routerLink: '/components/stepper',
              },
              {
                name: 'Expansive Panel',
                routerLink: '/components/expansive-panel',
              },
            ],
          },
          {
            icon: 'fa-solid fa-bars-progress',
            name: 'Menu',
            tools: [
              {
                name: 'Toolbar',
                routerLink: '/components/toolbar',
              },
              {
                name: 'Dropdown',
                routerLink: '/components/dropdown',
              },
              {
                name: 'Tab',
                routerLink: '/components/tab',
              },
            ],
          },
          {
            icon: 'fa-regular fa-window-restore',
            name: 'Janelas e Alertas',
            tools: [
              {
                name: 'Side Window',
                routerLink: '/components/side-window',
              },
              {
                name: 'Dialog',
                routerLink: '/components/dialog',
              },
              {
                name: 'Confirm',
                routerLink: '/components/confirm',
              },
              {
                name: 'Snackbar',
                routerLink: '/components/snackbar',
              },
              {
                name: 'Alert',
                routerLink: '/components/alert',
              },
              {
                name: 'Tooltip',
                routerLink: '/components/tooltip',
              },
            ],
          },
          {
            icon: 'fa-solid fa-file-arrow-down',
            name: 'Exportação e Download de Dados',
            tools: [
              {
                name: '.csv',
                routerLink: '/services/csv',
              },
              {
                name: '.xlsx',
                routerLink: '/services/xlsx',
              },
            ],
          },
          {
            icon: 'fa-solid fa-arrow-pointer',
            name: 'Botões',
            tools: [
              {
                name: 'Button',
                routerLink: '/components/button',
              },
            ],
          },
          {
            icon: 'fa-solid fa-spinner',
            name: 'Loaders',
            tools: [
              {
                name: 'Loader Page',
                routerLink: '/services/loader-page',
              },
            ],
          },
          {
            icon: 'fa-solid fa-book',
            name: 'Exemplos',
            tools: [
              {
                name: 'Página de CRUD',
                routerLink: '/examples/crud-page',
              },
            ],
          },
        ],
      });
    });
  }

  private buildPolices(decodedToken: CatAppDecodedToken) {
    CatRoutePolice.police = (path: string) => {
      return (
        decodedToken &&
        !!['/components/toolbar/'].find(
          (validPath) => path.indexOf(validPath) >= 0
        )
      );
    };
  }
}
