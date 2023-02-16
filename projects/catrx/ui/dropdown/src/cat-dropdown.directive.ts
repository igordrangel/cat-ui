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
  Type,
} from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith } from 'rxjs/internal/operators/startWith';
import { Subscription } from 'rxjs/internal/Subscription';
import { DropdownContentComponent } from './content/dropdown-content.component';
import { CatDropdownPosition } from './dropdown.component';

export interface DropdownConfig {
  insideClick: boolean;
  disabled: boolean;
  templateRef: TemplateRef<any>;
  position: CatDropdownPosition
}

@Directive({
  selector: '[catDropdown]',
})
export class CatDropdownDirective implements OnDestroy {
  @Input() catDropdown: DropdownConfig;

  private wasTrigged = false;
  private componentRef: ComponentRef<DropdownContentComponent> = null;
  private intervalObserveTriggerDestroy: Subscription;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  @HostListener('click')
  onClick(): void {
    if (!this.catDropdown.disabled) {
      this.initializeDropdown();
      setTimeout(() => this.wasTrigged = true, 1);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickout(event: PointerEvent): void {
    if (this.componentRef?.instance && this.wasTrigged) {
      if (this.componentRef.instance.elementRef.nativeElement.contains(event.target as Node)) {
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
    }
    this.intervalObserveTriggerDestroy?.unsubscribe();
  }

  private initializeDropdown() {
    if (this.componentRef === null) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(DropdownContentComponent);
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

        this.componentRef.instance.left = position.leftPosition;
        this.componentRef.instance.top = position.topPosition;

        this.observeTriggerDestroy();

        this.showDropdown();
      }, 1)
    }
  }

  private showDropdown() {
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

  private calcPosition() {
    const bodyWidth = document.body.clientWidth;
    let topPosition = 0;
    let leftPosition = 0;

    const { left, right, bottom, top, width, height } =
      this.elementRef.nativeElement.getBoundingClientRect();
    const dropdownWidth = document.querySelector('.cat-dropdown-content').clientWidth;
    const dropdownHeigth = document.querySelector('.cat-dropdown-content').clientHeight;
    const absoluteHorizontalPosition = left + width + dropdownWidth;
    const absoluteVerticalPosition = top + height + dropdownHeigth;

    if ((top - dropdownHeigth - 5) < 0 && this.catDropdown.position === 'top')
      this.catDropdown.position = 'bottom';
    if (absoluteHorizontalPosition > bodyWidth && this.catDropdown.position === 'right')
      this.catDropdown.position = 'left';

    switch (this.catDropdown.position) {
      case 'top':
        leftPosition = left;
        topPosition = top - dropdownHeigth - 5;
        break;
      case 'bottom':
        leftPosition = absoluteHorizontalPosition > bodyWidth ? left - width : left
        topPosition = bottom + 5;
        break;
      case 'left':
        console.log(left, width)
        leftPosition = left + width;
        topPosition = top;
        break;
      case 'right':
        leftPosition = right + 5;
        topPosition = top;
        break;
    }

    return { topPosition, leftPosition };
  }
}
