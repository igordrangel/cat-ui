import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CatLoaderModule } from '@catrx/ui/loader';

@Component({
  standalone: true,
  imports: [CommonModule, CatLoaderModule],
  template: `<cat-loader />`
})
export class LoaderButtonComponent {
}
