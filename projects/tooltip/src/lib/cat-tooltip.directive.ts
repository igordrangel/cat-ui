import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Injector, Input } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[catTooltip]',
})
export class CatTooltipDirective {
  @Input() catTooltip = '';

  private componentRef: ComponentRef<any> = null;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === null) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.querySelector('main').appendChild(domElem);
      this.setTooltipComponentProperties();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.catTooltip;
      const { left, right, top, width, height } =
        this.elementRef.nativeElement.getBoundingClientRect();
      const calcLeft = (right - left) / 2 + left + width;
      this.componentRef.instance.left = (calcLeft < 0 ? 5 : calcLeft);
      this.componentRef.instance.top = top - height;
    }
  }
}
