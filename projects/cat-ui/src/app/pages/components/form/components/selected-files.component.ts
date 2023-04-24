import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';
import { CatFileInterface } from '@catrx/ui/utils';

@Component({
  template: ` <ul>
    <li *ngFor="let file of data">{{ file.filename }}</li>
  </ul>`,
  imports: [CommonModule],
  standalone: true,
})
export class SelectedFilesComponent
  implements CatDynamicComponentDataInterface
{
  data: CatFileInterface[];
}
