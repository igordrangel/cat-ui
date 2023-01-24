import { Type } from '@angular/core';

export class CatDynamicComponent {
  constructor(public component: Type<any>, public data?: any) {}
}
