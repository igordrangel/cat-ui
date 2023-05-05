import { Component } from '@angular/core';
import { CatButtonModule } from '@catrx/ui/button';
import { CatComponentBase } from '@catrx/ui/common';
import { CatLoaderPageService } from '@catrx/ui/loader-page';
import { CatToolbarModule } from '@catrx/ui/toolbar';
import { klDelay } from '@koalarx/utils/operators/delay';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatButtonModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()">
      <nav buttons>
        <button catButton="primary" (click)="demonstrate()">Demonstrar</button>
      </nav>
    </cat-toolbar>
  `,
})
export class PageLoaderPageComponent extends CatComponentBase {
  constructor(private loaderPageService: CatLoaderPageService) {
    super();
  }

  async demonstrate() {
    this.loaderPageService.show();

    let progress = 0;
    do {
      await klDelay(50);
      progress++;
      this.loaderPageService.setProgress(progress);
    } while (progress < 100);

    this.loaderPageService.dismiss();
  }
}
