import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatButtonModule } from '@catrx/ui/button';
import { CatComponentBase } from '@catrx/ui/common';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CommonModule, CatToolbarModule, CatButtonModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo(true)">
      <nav buttons>
        <button
          catButton="default"
          *ngIf="!isSubpage"
          routerLink="./sub-pagina"
        >
          Ir para Subpágina
        </button>
      </nav>
    </cat-toolbar>
  `,
})
export class PageToolbarComponent extends CatComponentBase implements OnInit {
  isSubpage: boolean;

  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      this.isSubpage = !!map?.['params']?.['subpage'];
    });
  }
}
