import { Component } from '@angular/core';
import { CatButtonModule } from '@catrx/ui/button';
import { CatComponentBase } from '@catrx/ui/common';
import { CatStepperModule } from '@catrx/ui/stepper';
import { CatToolbarModule } from '@catrx/ui/toolbar';

@Component({
  standalone: true,
  imports: [CatToolbarModule, CatStepperModule, CatButtonModule],
  template: `
    <cat-toolbar [config]="getToolbarInfo()"></cat-toolbar>

    <cat-stepper direction="vertical" #stepper>
      <cat-step label="First Step">
        <div content>First</div>
        <nav actions>
          <button catButton="primary" (click)="stepper.next()">Próximo</button>
        </nav>
      </cat-step>
      <cat-step label="Second Step">
        <div content>Second</div>
        <nav actions>
          <button
            catButton="secondary"
            class="mr-5"
            (click)="stepper.previous()"
          >
            Voltar
          </button>
          <button catButton="primary" (click)="stepper.next()">Próximo</button>
        </nav>
      </cat-step>
      <cat-step label="Third Step">
        <div content>Third</div>
        <nav actions>
          <button catButton="secondary" (click)="stepper.previous()">
            Voltar
          </button>
        </nav>
      </cat-step>
    </cat-stepper>
  `,
})
export class PageStepperComponent extends CatComponentBase {}
