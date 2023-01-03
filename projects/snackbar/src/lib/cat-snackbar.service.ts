import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { randomString } from '@koalarx/utils/operators/string';
import { SnackbarComponent } from './snackbar.component';

export const CAT_SNACKBAR_CONFIG = new InjectionToken('CatSnackbarConfig');
export const CAT_SNACKBAR_REF_TOKEN = new InjectionToken('CatSnackbarRefToken');

export type CatSnackbarType = 'success' | 'warning' | 'error' | 'info';
export interface CatSnackbarConfig {
  type: CatSnackbarType;
  title: string;
  message?: string;
  openedTime?: number;
}

@Injectable()
export class CatSnackbarRef<SnackbarRef> {
  constructor(
    @Inject(CAT_SNACKBAR_CONFIG) private config: CatSnackbarConfig,
    @Inject(CAT_SNACKBAR_REF_TOKEN) private elementId: string
  ) {}

  close() {
    const elDialog = document.getElementById(this.elementId);
    if (elDialog) {
      const elDialogContent = document.querySelector(
        `#${this.elementId} .cat-snackbar-container`
      );
      elDialogContent?.classList.add('animate__animated');
      elDialogContent?.classList.add('animate__zoomOut');
      setTimeout(() => elDialog.remove(), 200);
    }
  }
}

@Injectable({ providedIn: 'root' })
export class CatSnackbarService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {}

  public open(config: CatSnackbarConfig) {
    const elementId = this.generateElementId();
    const main = document.querySelector('main');
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(SnackbarComponent)
      .create(
        Injector.create({
          providers: [
            { provide: CAT_SNACKBAR_CONFIG, useValue: config },
            { provide: CAT_SNACKBAR_REF_TOKEN, useValue: elementId },
            {
              provide: CatSnackbarRef,
              deps: [CAT_SNACKBAR_CONFIG, CAT_SNACKBAR_REF_TOKEN],
            },
          ],
        })
      );

    this.appRef.attachView(componentRef.hostView);

    const elDialog = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    elDialog.id = elementId;

    main.appendChild(elDialog);

    const elDialogContent = document.querySelector(
      `#${elementId} .cat-snackbar-container`
    );
    elDialogContent?.classList.add('animate__animated');
    elDialogContent?.classList.add('animate__zoomIn');
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
