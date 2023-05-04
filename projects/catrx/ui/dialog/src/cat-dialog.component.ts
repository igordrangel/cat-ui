import { Component } from '@angular/core';

@Component({
  selector: 'cat-dialog',
  standalone: true,
  template: `
    <div class="cat-dialog">
      <div class="cat-dialog-content">
        <div class="cat-modal-header">
          <ng-content select="div[header]"></ng-content>
        </div>
        <div class="cat-modal-content">
          <ng-content select="div[content]"></ng-content>
        </div>
        <div class="cat-modal-actions">
          <ng-content select="div[actions]"></ng-content>
        </div>
      </div>
    </div>
  `
})
export class CatDialogComponent {}
