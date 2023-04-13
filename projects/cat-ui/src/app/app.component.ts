import { Component } from '@angular/core';
import { CatAppService } from '@catrx/ui';
import { AppService } from './app.service';
import { LoginComponent } from './login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  appConfig = this.catAppService
    .build(
      'Cat UI',
      {
        autoAuth: false,
        startedPage: () => '/examples/crud-page',
        jwt: {
          loginComponent: LoginComponent,
        },
        onAuth: (decodedToken) => this.appService.getMenu(decodedToken),
      },
      {
        menuStartState: 'closed',
      }
    )
    .setLogotype({
      default: '../assets/logotype.svg',
      negative: '../assets/logotype-negative.svg',
    })
    .pushNotifications({
      getNotifications: this.appService.getNotifications(),
      getPermissionToNotifyOnBrowser: true,
      intervalToGet: 30000,
      onDelete: (id) => this.appService.deleteNotification(id),
      onAllDelete: (ids) => this.appService.deleteNotifications(ids),
    })
    .enableDarkMode()
    .generate();

  constructor(
    private catAppService: CatAppService,
    private appService: AppService
  ) {
    this.applyTheme('modern');
  }

  applyTheme(name: 'minimalist' | 'modern', btnElement?: HTMLAnchorElement) {
    document.body.classList.remove('minimalist');
    document.body.classList.remove('modern');

    document.body.classList.add(name);

    if (name === 'modern') {
      this.appConfig.logotype = {
        default: '../assets/logotype-negative.svg',
        negative: '../assets/logotype-negative.svg',
      };
    } else {
      this.appConfig.logotype = {
        default: '../assets/logotype.svg',
        negative: '../assets/logotype-negative.svg',
      };
    }

    if (btnElement) {
      const totalChild = btnElement.parentElement.children.length;
      for (let indexChild = 0; indexChild < totalChild; indexChild++) {
        btnElement.parentElement.children
          .item(indexChild)
          .classList.remove('active');
      }

      btnElement.classList.add('active');
    }
  }
}
