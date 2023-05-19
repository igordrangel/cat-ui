import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
} from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith } from 'rxjs/internal/operators/startWith';
import { Subscription } from 'rxjs/internal/Subscription';
import { TooltipComponent } from './tooltip.component';

export type CatTooltipPosition = 'above' | 'below' | 'left' | 'right' | 'above';

@Directive({
  selector: '[catTooltip]',
})
export class CatTooltipDirective implements OnDestroy {
  @Input() catTooltip = '';
  @Input() catTooltipPosition: CatTooltipPosition = 'above';

  private showTimeout: number;
  private touchTimeout: number;
  private hideTimeout: number;
  private showDelay = 1000;
  private hideDelay = 0;
  private componentRef: ComponentRef<TooltipComponent> = null;
  private intervalObserveTriggerDestroy: Subscription;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (document.body.clientWidth > 980) this.initializeTooltip();
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
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.catTooltip;

      setTimeout(() => {
        const position = this.calcPosition();

        if (this.componentRef) {
          this.componentRef.instance.left = position.leftPosition;
          this.componentRef.instance.top = position.topPosition;
          this.componentRef.instance.visible = true;
        }

        this.observeTriggerDestroy();

        this.showTooltip();
      }, 1);
    }
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

  private calcPosition(withoutSwitches = false) {
    const bodyWidth = document.body.clientWidth;
    const bodyHeigth = document.body.clientHeight;

    let topPosition = 0;
    let leftPosition = 0;

    const { left, right, bottom, top, width, height } =
      this.elementRef.nativeElement.getBoundingClientRect();
    const elTooltipContent = document.querySelector('.cat-tooltip');
    const tooltipWidth = elTooltipContent?.clientWidth;
    const tooltipHeigth = elTooltipContent?.clientHeight;
    const triggerWidth = this.elementRef.nativeElement.clientWidth;
    const triggerHeight = this.elementRef.nativeElement.clientHeight;
    const absoluteHorizontalPosition = left + width + tooltipWidth;
    const absoluteVerticalPosition = top + height + tooltipHeigth;
    const isMobile = bodyWidth <= 980;

    if (!withoutSwitches) {
      if (
        this.calcPosition(true).topPosition - tooltipHeigth < 0 &&
        this.catTooltipPosition === 'above'
      )
        this.catTooltipPosition = 'below';
      if (
        absoluteHorizontalPosition > bodyWidth &&
        this.catTooltipPosition === 'right'
      )
        this.catTooltipPosition = 'left';
      if (
        this.calcPosition(true).leftPosition - tooltipWidth < 0 &&
        this.catTooltipPosition === 'left'
      )
        this.catTooltipPosition = 'right';
      if (
        absoluteVerticalPosition > bodyHeigth &&
        this.catTooltipPosition === 'below'
      )
        this.catTooltipPosition = 'above';
    }

    if (isMobile) {
      leftPosition = 5;
    }

    switch (this.catTooltipPosition) {
      case 'above':
        if (!isMobile) {
          leftPosition = left + this.calcMiddlePosition(tooltipWidth);
          if ((leftPosition + tooltipWidth) > bodyWidth) {
            leftPosition = bodyWidth - this.calcMiddlePosition(tooltipWidth) - 5;
          }
        }

        topPosition = top;
        break;
      case 'below':
        if (!isMobile) {
          leftPosition = left + this.calcMiddlePosition(tooltipWidth);
          if ((leftPosition + tooltipWidth) > bodyWidth) {
            leftPosition = bodyWidth - this.calcMiddlePosition(tooltipWidth) - 5;
          }
        }

        topPosition = top + triggerHeight + tooltipHeigth;
        break;
      case 'left':
        if (!isMobile)
          leftPosition = left - this.calcMiddlePosition(tooltipWidth);

        topPosition =
          top +
          this.calcMiddlePosition(triggerHeight) +
          this.calcMiddlePosition(tooltipHeigth);
        break;
      case 'right':
        if (!isMobile)
          leftPosition =
            left + triggerWidth + this.calcMiddlePosition(tooltipWidth);

        topPosition =
          top +
          this.calcMiddlePosition(triggerHeight) +
          this.calcMiddlePosition(tooltipHeigth);
        break;
    }

    return { topPosition, leftPosition };
  }

  private calcMiddlePosition(value: number) {
    return value / 2;
  }
}
