import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';
import { randomString } from '@koalarx/utils/operators/string';
import { CatSideWindowRef, CAT_SIDE_WINDOW_CONFIG, CAT_SIDE_WINDOW_REF_TOKEN } from './side-window';
import { SideWindowComponent } from './side-window.component';

export interface CatSideWindowConfig {
  component: Type<any>;
  data?: any;
}

@Injectable({ providedIn: 'root' })
export class CatSideWindowService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {}

  public open(component: Type<any>, data?: any) {
    const elementId = this.generateElementId();
    const contentApp = document.querySelector('main #cat-content-app');
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(SideWindowComponent)
      .create(
        Injector.create({
          providers: [
            {
              provide: CAT_SIDE_WINDOW_CONFIG,
              useValue: {
                component,
                data
              } as CatSideWindowConfig,
            },
            { provide: CAT_SIDE_WINDOW_REF_TOKEN, useValue: elementId },
            {
              provide: CatSideWindowRef,
              deps: [CAT_SIDE_WINDOW_CONFIG, CAT_SIDE_WINDOW_REF_TOKEN],
            },
          ],
        })
      );

    this.appRef.attachView(componentRef.hostView);

    const elSideWindow = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    elSideWindow.id = elementId;

    contentApp.appendChild(elSideWindow);

    const elSideWindowContent = document.querySelector(
      `#${elementId} .cat-side-window-content`
    );
    elSideWindowContent?.classList.add('animate__animated');
    elSideWindowContent?.classList.add('animate__slideInRight');
  }

  private generateElementId() {
    let elementId: string;

    do {
      elementId = randomString(50, {
        numbers: false,
        lowercase: true,
        uppercase: true,
        specialCharacters: false,
      });
    } while (!!document.getElementById(elementId));

    return elementId;
  }
}
