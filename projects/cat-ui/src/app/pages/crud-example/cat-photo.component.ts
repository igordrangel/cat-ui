import { Component } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';

@Component({
  template: `<img [src]="data" alt="Foto de Gato" />`,
  styles: [
    `
      img {
        border-radius: 8px;
        width: 40px;
        height: 40px;
      }
    `,
  ],
})
export class CatPhotoComponent implements CatDynamicComponentDataInterface {
  data: string;
}
