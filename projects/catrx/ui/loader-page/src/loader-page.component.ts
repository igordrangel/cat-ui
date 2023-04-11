import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { CatLoaderModule } from '@catrx/ui/loader';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CAT_LOADER_PAGE_CONFIG } from './cat-loader-page.service';

export interface CatLoaderPageConfig {
  progress$?: BehaviorSubject<number>;
}

@Component({
  selector: 'cat-loader-page',
  template: `<div class="cat-loader-page-container">
    <cat-loader></cat-loader>
    <ng-container *ngIf="config?.progress$ | async as progress">
      <div
        *ngIf="progress !== null && progress >= 0"
        class="cat-progress-bar-container"
      >
        <div class="cat-progress-bar" [style.width]="progress + '%'"></div>
      </div>
    </ng-container>
  </div>`,
  standalone: true,
  imports: [CommonModule, CatLoaderModule],
})
export class LoaderPageComponent {
  constructor(
    @Inject(CAT_LOADER_PAGE_CONFIG) public config?: CatLoaderPageConfig
  ) {}
}
