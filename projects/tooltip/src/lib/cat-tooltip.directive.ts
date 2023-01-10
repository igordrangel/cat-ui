import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Injector, Input } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

export type CatTooltipPosition = 'above' | 'below' | 'left' | 'right' | 'above';

@Directive({
  selector: '[catTooltip]',
})
export class CatTooltipDirective {
  @Input() catTooltip = '';
  @Input() catTooltipPosition: CatTooltipPosition = 'above';

  private showTimeout: any;
  private touchTimeout: any;
  private hideTimeout: any;
  private showDelay = 0;
  private hideDelay = 0;
  private componentRef: ComponentRef<any> = null;
  private intervalObserveTriggerDestroy: Subscription;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.initializeTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart($event: TouchEvent): void {
    $event.preventDefault();
    window.clearTimeout(this.touchTimeout);
    this.touchTimeout = window.setTimeout(
      this.initializeTooltip.bind(this),
      500
    );
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    window.clearTimeout(this.touchTimeout);
    this.setHideTooltipTimeout();
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
    this.intervalObserveTriggerDestroy?.unsubscribe();
  }

  private initializeTooltip() {
    if (this.componentRef === null) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.querySelector('main').appendChild(domElem);
      this.setTooltipComponentProperties();
      this.showTimeout = window.setTimeout(
        this.showTooltip.bind(this),
        this.showDelay
      );
    }
  };

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.catTooltip;

      const { left, right, bottom, top, width, height } =
        this.elementRef.nativeElement.getBoundingClientRect();
      const letterWidth = 10;
      const tooltipWidth = (this.catTooltip.length * letterWidth) / 2;

      let calcLeft = Math.round((right - left) / 2 + left);

      switch (this.catTooltipPosition) {
        case 'below': {
          this.componentRef.instance.left =
            calcLeft < width ? tooltipWidth : calcLeft;
          this.componentRef.instance.top = Math.round(bottom + height);
          break;
        }
        case 'above': {
          this.componentRef.instance.left =
            calcLeft < width ? tooltipWidth : calcLeft;
          this.componentRef.instance.top = Math.round(top);
          break;
        }
        case 'right': {
          calcLeft = Math.round(right + (tooltipWidth * 2));
          this.componentRef.instance.left =
            calcLeft > document.body.clientWidth
              ? document.body.clientWidth - tooltipWidth
              : calcLeft - tooltipWidth;
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
          break;
        }
        case 'left': {
          calcLeft = Math.round(left - tooltipWidth);
          this.componentRef.instance.left =
            calcLeft < width ? tooltipWidth : calcLeft;
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
          break;
        }
        default: {
          break;
        }
      }

      this.observeTriggerDestroy();
    }
  }

  private setHideTooltipTimeout() {
    this.hideTimeout = window.setTimeout(
      this.destroy.bind(this),
      this.hideDelay
    );
  }

  private showTooltip() {
    if (this.componentRef !== null) {
      this.componentRef.instance.visible = true;
    }
  }

  private observeTriggerDestroy() {
    this.intervalObserveTriggerDestroy = interval(50)
      .pipe(startWith(0))
      .subscribe(() => {
        if (!this.elementRef.nativeElement.isConnected) this.destroy();
      });
  }
}
