import { Component, Inject, OnInit, Type } from '@angular/core';
import { CatDynamicComponent, CatDynamicComponentModule } from '@catrx/ui/dynamic-component';
import { CatSideWindowConfig } from './cat-side-window.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CatSideWindowRef, CAT_SIDE_WINDOW_CONFIG } from './side-window';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

interface SideWindowConfig extends CatSideWindowConfig {
  component: Type<any>;
}

@Component({
  template: `<div class="cat-side-window-content">
    <button (click)="close()" class="btn-close-side-window" matTooltip="Fechar">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
    <cat-dynamic-component [component]="getComponent()"></cat-dynamic-component>
  </div>`,
  styleUrls: ['./side-window.component.css'],
  standalone: true,
  imports: [CatDynamicComponentModule, MatTooltipModule],
})
export class SideWindowComponent implements OnInit {
  private subscriptionRouter: Subscription;

  constructor(
    @Inject(CAT_SIDE_WINDOW_CONFIG) public config: SideWindowConfig,
    private sideWindowRef: CatSideWindowRef<SideWindowComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptionRouter = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.close();
      }
    });
  }

  getComponent() {
    return new CatDynamicComponent(this.config.component, this.config.data);
  }

  close() {
    this.subscriptionRouter.unsubscribe();
    this.sideWindowRef.close();
  }
}
