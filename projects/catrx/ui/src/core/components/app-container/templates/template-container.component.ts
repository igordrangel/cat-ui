import { TemplateDesktopComponent } from './desktop/template-desktop.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { AppConfig, CatThemeType } from '../../../factory/app-config.interface';
import { TemplateMobileComponent } from './mobile/template-mobile.component';

type TemplateType = 'desktop' | 'mobile';

@Component({
  selector: 'cat-template-container[themeActive]',
  templateUrl: './template-container.component.html'
})
export class TemplateContainerComponent {
  @Input() appConfig: AppConfig
  @Input() themeActive: BehaviorSubject<CatThemeType>
  @Output() menuCollapse = new EventEmitter<boolean>()

  @ViewChild('desktopTemplate') desktopTemplate: TemplateDesktopComponent
  @ViewChild('mobileTemplate') mobileTemplate: TemplateMobileComponent

  template$ = new BehaviorSubject<TemplateType>('mobile')
}
