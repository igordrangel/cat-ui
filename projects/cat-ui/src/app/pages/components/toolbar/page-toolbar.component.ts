import { Component, OnInit } from '@angular/core';
import { CatBaseComponent } from '@catrx/ui/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './page-toolbar.component.html'
})
export class PageToolbarComponent extends CatBaseComponent implements OnInit {
  isSubpage: boolean;

  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(map => {
      this.isSubpage = !!map?.['params']?.['subpage'];
    })
  }
}
