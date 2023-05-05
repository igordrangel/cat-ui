import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { CatDialogOptions } from './cat-dialog.interface';
import { randomString } from '@koalarx/utils/operators/string';
import {
  CatDialogRef,
  CAT_DIALOG_DATA,
  CAT_DIALOG_OPTIONS,
  CAT_DIALOG_REF_TOKEN,
} from './cat-dialog';

@Injectable({ providedIn: 'root' })
export class CatDialogService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {}

  public open(component: Type<any>, options?: CatDialogOptions) {
    const elementId = this.generateElementId();
    const main = document.querySelector('main');
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(
        Injector.create({
          providers: [
            { provide: CAT_DIALOG_DATA, useValue: options?.data },
            { provide: CAT_DIALOG_OPTIONS, useValue: options },
            { provide: CAT_DIALOG_REF_TOKEN, useValue: elementId },
            {
              provide: CatDialogRef,
              deps: [CAT_DIALOG_OPTIONS, CAT_DIALOG_REF_TOKEN],
            },
          ],
        })
      );

    this.appRef.attachView(componentRef.hostView);

    const elDialog = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    elDialog.id = elementId;
    elDialog.children?.[0].classList.add(
      `dialog-size-${options?.size ?? 'auto'}`
    );

    main.appendChild(elDialog);

    const elDialogBackdrop = document.querySelector(
      `#${elementId} .cat-dialog`
    );
    elDialogBackdrop?.classList.add('animate__animated');
    elDialogBackdrop?.classList.add('animate__fadeIn');

    const elDialogContent = document.querySelector(
      `#${elementId} .cat-dialog-content`
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
    } while (document.getElementById(elementId));

    return elementId;
  }
}
