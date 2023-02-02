import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[catDynamicComponent]',
})
export class DynamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
