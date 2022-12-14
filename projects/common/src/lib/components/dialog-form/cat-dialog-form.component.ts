import { CommonModule } from "@angular/common";
import { Component, Inject, ViewChild } from '@angular/core';
import { CatPrimaryButtonComponent, CatSecondaryButtonComponent } from "@catrx/ui/button";
import { CatDialogModule, CatDialogRef, CAT_DIALOG_DATA } from "@catrx/ui/dialog";
import { CatFormModule, FormComponent } from "@catrx/ui/form";
import { CatDialogFormConfig } from "./cat-dialog-form.interface";
import { BehaviorSubject } from 'rxjs';
import { CatSnackbarService } from "@catrx/ui/snackbar";
import { HttpErrorResponse } from "@angular/common/http";

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
        <cat-secondary-button
          (click)="dialogRef.close()"
          [disabled]="submitLoader$ | async"
          [style.marginRight]="'5px'"
        >
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
    @Inject(CAT_DIALOG_DATA) public config: CatDialogFormConfig,
    public dialogRef: CatDialogRef<CatDialogFormComponent>,
    private snackbarService: CatSnackbarService
  ) {}

  public submit() {
    this.elForm?.submit(
      () => this.submitLoader$.next(true),
      () => {
        this.submitLoader$.next(false);
        this.snackbarService.open({
          type: 'success',
          openedTime: 5000,
          title: `Registro ${
            this.config.isEdit ? 'atualizado' : 'inclu??do'
          } com sucesso!`,
        });
        this.dialogRef.close('reloadList');
      },
      (err: HttpErrorResponse) => {
        this.submitLoader$.next(false);
        this.snackbarService.open({
          type: err?.statusText?.startsWith('4') ? 'warning' : 'error',
          title: 'Algo inesperado ocorreu...',
          message: err?.message ?? 'Ocorreu um problema desconhecido.',
        });
      }
    );
  }
}
