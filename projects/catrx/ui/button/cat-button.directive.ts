import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LoaderButtonComponent } from './loader-button.component';

export type CatButtonColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

@Directive({
  selector: 'button[catButton]',
})
export class CatButtonDirective implements OnInit, OnChanges {
  @Input({ required: true }) catButton: CatButtonColor;
  @Input() outline = false;
  @Input() showLoader = false;

  private componentRef: ComponentRef<LoaderButtonComponent> = null;
  private defaultElementsOnHost: ChildNode[] = [];

  constructor(
    private elementRef: ElementRef<HTMLButtonElement>,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showLoader']) {
      this.showLoaderOnButton();
    }
  }

  ngOnInit(): void {
    if (this.showLoader) {
      this.showLoaderOnButton();
    }

    if (this.componentRef === null) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          LoaderButtonComponent
        );
      this.componentRef = componentFactory.create(this.injector);

      this.appRef.attachView(this.componentRef.hostView);

      this.elementRef.nativeElement.classList.add('btn');
      this.elementRef.nativeElement.classList.add('btn-sm');
      this.elementRef.nativeElement.classList.add(this.getClassByVariant());

      this.elementRef.nativeElement.childNodes.forEach((node) =>
        this.defaultElementsOnHost.push(node)
      );
    }
  }

  private getClassByVariant() {
    switch (this.catButton) {
      case 'default':
        return `btn${this.outline ? '-outline-' : '-'}default`;
      case 'primary':
        return `btn${this.outline ? '-outline-' : '-'}primary`;
      case 'secondary':
        return `btn${this.outline ? '-outline-' : '-'}secondary`;
      case 'success':
        return `btn${this.outline ? '-outline-' : '-'}success`;
      case 'warning':
        return `btn${this.outline ? '-outline-' : '-'}warning`;
      case 'danger':
        return `btn${this.outline ? '-outline-' : '-'}danger`;
      case 'info':
        return `btn${this.outline ? '-outline-' : '-'}info`;
    }
  }

  private showLoaderOnButton() {
    this.elementRef.nativeElement.disabled = this.showLoader;

    if (this.defaultElementsOnHost.length > 0) {
      this.elementRef.nativeElement.innerHTML = '';

      if (this.showLoader) {
        const loaderElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;

        this.elementRef.nativeElement.appendChild(loaderElem);
      }

      this.defaultElementsOnHost.forEach((node) => {
        if (
          (node.nodeName === 'I' && !this.showLoader) ||
          node.nodeName !== 'I'
        ) {
          this.elementRef.nativeElement.appendChild(node);
        }
      });
    }
  }
}
