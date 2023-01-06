import { Component } from '@angular/core';
import { CatAppService } from '@catrx/ui/core';
import { AppService } from './app.service';
import { LoginComponent } from './login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  appConfig = this.catAppService
    .build('Cat UI', {
      autoAuth: true,
      startedPage: '/examples/crud-page',
      jwt: {
        loginComponent: LoginComponent,
      },
      onAuth: (decodedToken) => this.appService.getMenu(decodedToken),
    })
    .setLogotype({
      default: '../assets/logotype.svg',
      negative: '../assets/logotype-negative.svg',
    })
    .enableDarkMode()
    .generate();

  constructor(
    private catAppService: CatAppService,
    private appService: AppService
  ) {}
}
