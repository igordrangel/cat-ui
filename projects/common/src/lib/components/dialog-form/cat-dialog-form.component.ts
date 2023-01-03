import { CommonModule } from "@angular/common";
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { CatPrimaryButtonComponent, CatSecondaryButtonComponent } from "@catrx/ui/button";
import { CatDialogModule, CatDialogRef, CAT_DIALOG_DATA } from "@catrx/ui/dialog";
import { CatFormModule, FormComponent } from "@catrx/ui/form";
import { CatDialogFormConfig } from "./cat-dialog-form.interface";
import { BehaviorSubject } from 'rxjs';

@Component({
  template: `<form (submit)="$event.preventDefault(); submit()">
    <cat-dialog>
      <div header>
        <i
          [ngClass]="{
            'fa-pen': config?.isEdit,
            'fa-circle-plus': !config?.isEdit
          }"
          class="fa-solid mr-8"
        >
        </i>
        {{
          (config?.isEdit ? 'Editar ' : 'Incluir ') +
            (config?.title ? config?.title : '')
        }}
      </div>
      <div content>
        <cat-form #form [config]="config?.formConfig"></cat-form>
      </div>
      <div actions>
        <cat-secondary-button (click)="dialogRef.close()" class="mr-8">
          Cancelar
        </cat-secondary-button>
        <cat-primary-button type="submit" [showLoader]="submitLoader$ | async">
          Salvar
        </cat-primary-button>
      </div>
    </cat-dialog>
  </form>`,
  standalone: true,
  imports: [
    CommonModule,
    CatDialogModule,
    CatFormModule,
    CatPrimaryButtonComponent,
    CatSecondaryButtonComponent,
  ],
})
export class CatDialogFormComponent {
  submitLoader$ = new BehaviorSubject<boolean>(false);
  @ViewChild('form', { static: true }) private elForm?: FormComponent;

  constructor(
    public dialogRef: CatDialogRef<CatDialogFormComponent>,
    @Inject(CAT_DIALOG_DATA) public config: CatDialogFormConfig
  ) {}

  public submit() {
    this.elForm?.submit(
      () => this.submitLoader$.next(true),
      () => {
        this.submitLoader$.next(false);
        this.dialogRef.close('reloadList');
      },
      () => this.submitLoader$.next(false)
    );
  }
}
