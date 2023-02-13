import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AppConfig, CatThemeType } from '../../../../factory/app-config.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'cat-template-mobile[themeActive]',
  templateUrl: './template-mobile.component.html',
  styleUrls: ['./template-mobile.component.css']
})
export class TemplateMobileComponent implements OnInit {
  @Input() appConfig: AppConfig
  @Input() themeActive: BehaviorSubject<CatThemeType>
  @Output() menuCollapse = new EventEmitter<boolean>()

  @ViewChild('menuToolbar') menuToolbar: ElementRef<HTMLDivElement>

  public menuCollapsed$ = new BehaviorSubject<boolean>(true)

  ngOnInit() {
    if (this.appConfig.options?.menuStartState === 'closed') {
      this.menuCollapsed$.next(false)
    }
    this.menuCollapse.emit(this.menuCollapsed$.getValue())
  }

  public collapseMenu() {
    this.menuCollapsed$.next(!this.menuCollapsed$.getValue())
    this.menuCollapse.emit(this.menuCollapsed$.getValue())
  }
}
