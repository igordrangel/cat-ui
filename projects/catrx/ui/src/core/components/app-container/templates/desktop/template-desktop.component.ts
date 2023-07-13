import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  AppConfig,
  AppMenuState,
  CatThemeType,
} from '../../../../factory/app-config.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'cat-template-desktop[themeActive]',
  templateUrl: './template-desktop.component.html',
})
export class TemplateDesktopComponent implements OnInit {
  @Input() appConfig: AppConfig;
  @Input() themeActive: BehaviorSubject<CatThemeType>;
  @Output() menuCollapse = new EventEmitter<boolean>();

  @ViewChild('menuToolbar') menuToolbar: ElementRef<HTMLDivElement>;

  public menuCollapsed$ = new BehaviorSubject<boolean>(true);

  ngOnInit() {
    const savedMenuState = localStorage.getItem(
      this.getLocalStorageMenuStateName()
    ) as AppMenuState;
    const isCollapsed = savedMenuState
      ? savedMenuState === 'collapsed'
      : this.appConfig.options?.menuStartState === 'collapsed'

    this.menuCollapsed$.next(isCollapsed);
    this.menuCollapse.emit(this.menuCollapsed$.getValue());
  }

  public collapseMenu() {
    this.menuCollapsed$.next(!this.menuCollapsed$.getValue());
    this.menuCollapse.emit(this.menuCollapsed$.getValue());
    localStorage.setItem(
      this.getLocalStorageMenuStateName(),
      this.menuCollapsed$.getValue()
        ? 'collapsed'
        : 'closed'
    );
  }

  public getLogotype() {
    const isCollapsed = this.menuCollapsed$.getValue();
    const darkMode = this.themeActive.getValue() === 'dark';

    if (this.appConfig.logotype) {
      if (isCollapsed) {
        if (darkMode) {
          return (
            this.appConfig.logotype.negative ?? this.appConfig.logotype.default
          );
        } else {
          return this.appConfig.logotype.default;
        }
      } else {
        if (darkMode) {
          return (
            this.appConfig.logotype.negativeForUncollapse ??
            this.appConfig.logotype.default
          );
        } else {
          return (
            this.appConfig.logotype.defaultForUncollapse ??
            this.appConfig.logotype.default
          );
        }
      }
    }

    return null;
  }

  private getLocalStorageMenuStateName() {
    return `${this.getDefaultAliasStorageName()}:menu-state`;
  }

  private getDefaultAliasStorageName() {
    return `@${this.appConfig.appName.replace(/ /g, '-').toLocaleLowerCase()}`;
  }
}
