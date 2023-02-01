import { Component } from '@angular/core';
import { CatComponentBase } from '@catrx/ui/common';
import { CatLoaderPageService } from '@catrx/ui/loader-page';
import { klDelay } from '@koalarx/utils/operators/delay';

@Component({
  templateUrl: './page-loader-page.component.html',
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
