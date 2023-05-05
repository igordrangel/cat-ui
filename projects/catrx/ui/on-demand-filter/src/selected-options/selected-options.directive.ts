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
import { SelectedOptions } from '../factory/filter-options.types';
import { SelectedOptionsComponent } from './selected-options.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Directive({
  selector: 'div[catOnDemandFilterSelectedOptions]',
})
export class SelectedOptionsDirective implements OnInit {
  @Input() catOnDemandFilterSelectedOptions: BehaviorSubject<SelectedOptions[]>;
  private componentRef: ComponentRef<SelectedOptionsComponent> = null;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    if (this.componentRef === null) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          SelectedOptionsComponent
        );
      this.componentRef = componentFactory.create(this.injector);

      this.componentRef.instance.selectedOptions$ =
        this.catOnDemandFilterSelectedOptions;

      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      this.elementRef.nativeElement.innerHTML = '';
      this.elementRef.nativeElement.appendChild(domElem);
    }
  }
}
