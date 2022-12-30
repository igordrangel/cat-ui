import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatComponentBase } from '@catrx/ui/core';

@Component({
  templateUrl: './page-toolbar.component.html'
})
export class PageToolbarComponent extends CatComponentBase implements OnInit {
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
