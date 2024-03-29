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
  CatThemeType,
} from '../../../../factory/app-config.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'cat-template-mobile[themeActive]',
  templateUrl: './template-mobile.component.html',
})
export class TemplateMobileComponent implements OnInit {
  @Input() appConfig: AppConfig;
  @Input() themeActive: BehaviorSubject<CatThemeType>;
  @Output() menuCollapse = new EventEmitter<boolean>();

  @ViewChild('menuToolbar') menuToolbar: ElementRef<HTMLDivElement>;

  public menuCollapsed$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.menuCollapsed$.getValue()) {
          this.collapseMenu();
        }
      }
    });

    if (this.appConfig.options?.menuStartState === 'closed') {
      this.menuCollapsed$.next(false);
    }
    this.menuCollapse.emit(this.menuCollapsed$.getValue());
  }

  public collapseMenu() {
    this.menuCollapsed$.next(!this.menuCollapsed$.getValue());
    this.menuCollapse.emit(this.menuCollapsed$.getValue());

    document.getElementById('cat-content-app').style.overflow =
      this.menuCollapsed$.getValue() ? 'hidden' : 'auto';
  }
}
