import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { CatLoaderModule } from '@catrx/ui/loader';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CAT_LOADER_PAGE_CONFIG } from './cat-loader-page.service';

export interface CatLoaderPageConfig {
  progress$?: BehaviorSubject<number>;
}

@Component({
  selector: 'lib-loader-page',
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
  styles: [
    `
      .cat-loader-page-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 1004;
      }
      .cat-progress-bar-container {
        position: relative;
        margin: 20px 0;
        border-radius: 5px;
        width: 10vw;
        height: 10px;
        background-color: var(--bg-progress-bar-container);
        overflow: hidden;
      }
      .cat-progress-bar-container .cat-progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--bg-progress-bar);
        height: 10px;
        transition: 0.1s;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, CatLoaderModule],
})
export class LoaderPageComponent {
  constructor(
    @Inject(CAT_LOADER_PAGE_CONFIG) public config?: CatLoaderPageConfig
  ) {}
}
