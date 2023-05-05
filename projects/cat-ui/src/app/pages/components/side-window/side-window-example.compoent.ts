import { Component } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';

@Component({
  standalone: true,
  template: `<h2>{{ data }}</h2>`,
})
export class SideWindowExampleComponent
  implements CatDynamicComponentDataInterface
{
  data: string;
}
