import { TemplateDesktopComponent } from './desktop/template-desktop.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { AppConfig, CatThemeType } from '../../../factory/app-config.interface';
import { TemplateMobileComponent } from './mobile/template-mobile.component';
import { klDelay } from '@koalarx/utils/operators/delay';

type TemplateType = 'desktop' | 'mobile';

@Component({
  selector: 'cat-template-container[themeActive]',
  templateUrl: './template-container.component.html'
})
export class TemplateContainerComponent implements OnInit {
  @Input() appConfig: AppConfig
  @Input() themeActive: BehaviorSubject<CatThemeType>
  @Output() menuCollapse = new EventEmitter<boolean>()

  @ViewChild('desktopTemplate') desktopTemplate: TemplateDesktopComponent
  @ViewChild('mobileTemplate') mobileTemplate: TemplateMobileComponent

  template$ = new BehaviorSubject<TemplateType>('desktop')

  async ngOnInit() {
    let windowsWidth = 0;
    do {
      windowsWidth = document.body.clientWidth;
      if (windowsWidth <= 980 && this.template$.getValue() === 'desktop') {
        this.template$.next('mobile');
        this.menuCollapse.emit(false);
      } else if (windowsWidth > 980 && this.template$.getValue() === 'mobile') {
        this.template$.next('desktop');
        this.menuCollapse.emit(true);
      }
      await klDelay(50);
    } while (windowsWidth)
  }
}
