import { Component } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';

@Component({
  template: `<img [src]="data" alt="Foto de Gato" width="100" height="100" />`,
  styles: [
    `
      img {
        border-radius: 50%;
      }
    `,
  ],
})
export class CatPhotoComponent implements CatDynamicComponentDataInterface {
  data: string;
}
