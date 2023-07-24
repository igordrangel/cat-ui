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
  TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith } from 'rxjs/internal/operators/startWith';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DropdownContentComponent } from './dropdown-content.component';
import { CatDropdownPosition } from './dropdown.interface';

export interface DropdownConfig {
  insideClick: boolean;
  disabled: boolean;
  templateRef: TemplateRef<any>;
  position: CatDropdownPosition;
  onClose: (isClosed: boolean) => void;
  close: Subject<boolean>;
}

@Directive({
  selector: '[catDropdown]',
})
export class CatDropdownDirective implements OnDestroy {
  @Input() catDropdown: DropdownConfig;

  private wasTrigged = false;
  private componentRef: ComponentRef<DropdownContentComponent> = null;
  private intervalObserveTriggerDestroy: Subscription;
  private destroySubscriptions$ = new Subject();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  @HostListener('click')
  onClick(): void {
    if (!this.catDropdown.disabled) {
      this.validateWasTrigger();
      this.initializeDropdown();
      setTimeout(() => (this.wasTrigged = true), 1);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickout(event: PointerEvent): void {
    if (this.componentRef?.instance && this.wasTrigged) {
      if (
        this.componentRef.instance.elementRef.nativeElement.contains(
          event.target as Node
        )
      ) {
        if (!this.catDropdown.insideClick) {
          this.destroy();
        }
      } else {
        this.destroy();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
      this.wasTrigged = false;
      this.catDropdown.onClose(true);
      this.destroySubscriptions$.next(true);
    }
    this.intervalObserveTriggerDestroy?.unsubscribe();
  }

  private initializeDropdown() {
    if (this.componentRef === null) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          DropdownContentComponent
        );
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.querySelector('main').appendChild(domElem);
      this.setDropdownComponentProperties();
    }
  }

  private setDropdownComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.dropdownContent = this.catDropdown.templateRef;

      setTimeout(() => {
        const position = this.calcPosition();

        if (this.componentRef) {
          this.componentRef.instance.left = position.leftPosition;
          this.componentRef.instance.top = position.topPosition;
          this.componentRef.instance.visible = true;
        }

        this.observeTriggerDestroy();

        this.showDropdown();
      }, 1);
    }
  }

  private showDropdown() {
    if (this.componentRef !== null) {
      this.componentRef.instance.visible = true;
      this.catDropdown.close
        .pipe(takeUntil(this.destroySubscriptions$))
        .subscribe(() => this.destroy());
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
    let absolutePosition = 0;

    const { left, right, bottom, top, width, height } =
      this.elementRef.nativeElement.getBoundingClientRect();
    const elDropdownContent = document.querySelector('.cat-dropdown-content');
    const dropdownWidth = elDropdownContent?.clientWidth;
    const dropdownHeigth = elDropdownContent?.clientHeight;
    const absoluteHorizontalPosition = left + width + dropdownWidth;
    const absoluteVerticalPosition = top + height + dropdownHeigth;
    const isMobile = bodyWidth <= 980;

    if (withoutSwitches) {
      if (
        this.calcPosition(true).topPosition < 0 &&
        this.catDropdown.position === 'top'
      )
        this.catDropdown.position = 'bottom';
      if (
        absoluteHorizontalPosition > bodyWidth &&
        this.catDropdown.position === 'right'
      )
        this.catDropdown.position = 'left';
      if (
        this.calcPosition(true).leftPosition < 0 &&
        this.catDropdown.position === 'left'
      )
        this.catDropdown.position = 'right';
      if (
        absoluteVerticalPosition > bodyHeigth &&
        this.catDropdown.position === 'bottom'
      )
        this.catDropdown.position = 'top';
    }

    if (isMobile) {
      leftPosition = 5;
    }

    switch (this.catDropdown.position) {
      case 'top':
        if (!isMobile) leftPosition = left;

        topPosition = top - dropdownHeigth - 5;
        if (topPosition < 0) topPosition = 5;
        break;
      case 'bottom':
        if (!isMobile)
          leftPosition =
            absoluteHorizontalPosition > bodyWidth ? left - width : left;

        topPosition = bottom + 5;
        break;
      case 'left':
        if (!isMobile) {
          leftPosition = left - dropdownWidth - 5;
          if (leftPosition < 0) {
            leftPosition = 5;
          } else if (absoluteVerticalPosition > bodyHeigth) {
            topPosition -= dropdownHeigth / 2;
          }
        }

        topPosition = top;
        break;
      case 'right':
        if (!isMobile) {
          leftPosition = right + 5;
          if (leftPosition > absoluteHorizontalPosition)
            leftPosition = absoluteHorizontalPosition - 5;
        }

        topPosition = top;

        absolutePosition = topPosition + dropdownHeigth + height;
        if (topPosition < 0) {
          topPosition = 5;
        } else if (absoluteVerticalPosition > bodyHeigth) {
          topPosition -= dropdownHeigth / 2;
        }
        break;
    }

    return { topPosition, leftPosition };
  }

  private validateWasTrigger() {
    if (this.wasTrigged && !this.componentRef) {
      this.wasTrigged = false;
    }
  }
}
