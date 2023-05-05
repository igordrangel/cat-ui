import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { TriggerComponent } from './trigger.component';
import { FilterConfig } from '../factory/filter-options.types';

@Directive({
  selector: 'div[catOnDemandFilterTrigger]',
})
export class TriggerDirective implements OnInit {
  @Input() catOnDemandFilterTrigger: FilterConfig;
  private componentRef: ComponentRef<TriggerComponent> = null;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    if (this.componentRef === null) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(TriggerComponent);
      this.componentRef = componentFactory.create(this.injector);

      this.componentRef.instance.config = this.catOnDemandFilterTrigger;
      this.componentRef.instance.label =
        this.elementRef.nativeElement.textContent;

      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      this.elementRef.nativeElement.innerHTML = '';
      this.elementRef.nativeElement.appendChild(domElem);
    }
  }
}
