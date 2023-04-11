import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { interval } from 'rxjs/internal/observable/interval';
import {
  CatSnackbarConfig,
  CatSnackbarRef,
  CAT_SNACKBAR_CONFIG,
} from './cat-snackbar.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { startWith } from 'rxjs/operators';

@Component({
  template: `<div class="cat-snackbar-container">
    <div class="cat-snackbar-content" [ngClass]="config.type">
      <h2 class="title">
        <i [ngClass]="getIcon()"></i>
        {{ config.title }}
      </h2>
      <p
        *ngIf="config.message"
        class="message"
        [innerHTML]="config.message"
      ></p>
      <button (click)="close()" class="btn-snackbar-close">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <ng-container *ngIf="progress$ | async as progress">
      <div
        *ngIf="progress !== null && progress >= 0"
        class="cat-snackbar-progress-container animate__animated animate__fadeIn"
      >
        <div
          class="cat-snackbar-progress-bar"
          [style.width]="progress + '%'"
        ></div>
      </div>
    </ng-container>
  </div>`,
  standalone: true,
  imports: [CommonModule],
})
export class SnackbarComponent implements OnInit {
  public progress$ = new BehaviorSubject<number>(null);
  private intervalToClose?: Subscription;

  constructor(
    private snackbarRef: CatSnackbarRef,
    @Inject(CAT_SNACKBAR_CONFIG) public config: CatSnackbarConfig
  ) {}

  ngOnInit(): void {
    if (this.config.openedTime) {
      let passTime = 0;
      const intervalTime = 100;
      this.intervalToClose = interval(intervalTime)
        .pipe(startWith(0))
        .subscribe(() => {
          passTime += intervalTime;
          this.progress$.next(
            Math.ceil((passTime * 100) / this.config.openedTime)
          );
          if (passTime >= this.config.openedTime) {
            this.close();
          }
        });
    }
  }

  getIcon() {
    switch (this.config.type) {
      case 'success':
        return 'fa-regular fa-circle-check';
      case 'warning':
        return 'fa-solid fa-triangle-exclamation';
      case 'error':
        return 'fa-regular fa-circle-xmark';
      case 'info':
        return 'fa-solid fa-circle-exclamation';
    }
  }

  close() {
    this.intervalToClose?.unsubscribe();
    this.snackbarRef.close();
  }
}
