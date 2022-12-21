import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type CatThemeType = 'light' | 'dark';

@Component({
  selector: 'cat-app-container[logotypeImageSource]',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContainerComponent implements OnInit {
  @Input() logotypeImageSource: string;
  @Input() logotypeImageNegativeSource?: string;
  @Input() defaultTheme?: CatThemeType;
  @Input() darkMode?: boolean;
  @Input() sideMenuOptions?: any;

  public menuCollapsed$ = new BehaviorSubject<boolean>(true);
  public themeActive$ = new BehaviorSubject<CatThemeType>(
    this.defaultTheme ?? 'light'
  );

  constructor() {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.themeActive$.next('dark');
      } else {
        this.themeActive$.next('light');
      }
    }
  }

  ngOnInit() {
    this.menuCollapsed$.next(!!this.sideMenuOptions);
  }

  public collapseMenu() {
    this.menuCollapsed$.next(!this.menuCollapsed$.getValue());
  }

  public switchTheme() {
    const currentTheme = this.themeActive$.getValue();
    this.themeActive$.next(currentTheme === 'dark' ? 'light' : 'dark');
  }
}
