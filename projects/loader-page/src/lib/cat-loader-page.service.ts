import { LoaderPageComponent } from './loader-page.component';
import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, InjectionToken, Injector } from '@angular/core';
import { randomString } from '@koalarx/utils/operators/string';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export const CAT_LOADER_PAGE_CONFIG = new InjectionToken('CatLoaderPageConfig');

@Injectable({ providedIn: 'root' })
export class CatLoaderPageService {
  private elementId: string;
  private progress$: BehaviorSubject<number>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {}

  public show() {
    this.elementId = this.generateElementId();
    this.progress$ = new BehaviorSubject<number>(null);
    const main = document.querySelector('main');
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(LoaderPageComponent)
      .create(
        Injector.create({
          providers: [{ provide: CAT_LOADER_PAGE_CONFIG, useValue: {progress$: this.progress$} }],
        })
      );

    this.appRef.attachView(componentRef.hostView);

    const elDialog = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    elDialog.id = this.elementId;

    main.appendChild(elDialog);

    const elDialogContent = document.querySelector(
      `#${this.elementId} .cat-loader-page-container`
    );
    elDialogContent?.classList.add('animate__animated');
    elDialogContent?.classList.add('animate__fadeIn');
  }

  public dismiss() {
    const elDialog = document.getElementById(this.elementId);
    if (elDialog) {
      const elDialogContent = document.querySelector(
        `#${this.elementId} .cat-loader-page-container`
      );
      elDialogContent?.classList.add('animate__animated');
      elDialogContent?.classList.add('animate__fadeOut');
      setTimeout(() => {
        elDialog.remove();
        this.progress$.unsubscribe();
      }, 200);
    }
  }

  public setProgress(progress: number) {
    this.progress$.next(progress);
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
