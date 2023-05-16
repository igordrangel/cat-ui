import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  CatDialogRef,
  CAT_DIALOG_DATA,
  CatDialogComponent,
} from '@catrx/ui/dialog';
import { CatFormModule } from '@catrx/ui/form';
import { CatDialogFormConfig } from './cat-dialog-form.interface';
import { CatSnackbarService } from '@catrx/ui/snackbar';
import { HttpErrorResponse } from '@angular/common/http';
import { CatFormBase } from '../../abstractions/cat-form.base';
import { CatButtonModule } from '@catrx/ui/button';

@Component({
  standalone: true,
  imports: [CommonModule, CatDialogComponent, CatFormModule, CatButtonModule],
  template: `
    <form (submit)="submit($event)">
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
          <button
            catButton="secondary"
            type="button"
            (click)="dialogRef.close()"
            [disabled]="submitLoader$ | async"
            [style.marginRight]="'5px'">
            Cancelar
          </button>
          <button
            catButton="primary"
            type="submit"
            [showLoader]="submitLoader$ | async">
            Salvar
          </button>
        </div>
      </cat-dialog>
    </form>
  `,
})
export class CatDialogFormComponent extends CatFormBase {
  constructor(
    @Inject(CAT_DIALOG_DATA) public config: CatDialogFormConfig,
    public dialogRef: CatDialogRef,
    private snackbarService: CatSnackbarService
  ) {
    super();
  }

  public override submit(event?: Event) {
    event?.preventDefault();
    this.elForm?.submit(
      () => this.submitLoader$.next(true),
      () => {
        this.snackbarService.open({
          type: 'success',
          openedTime: 5000,
          title: `Registro ${
            this.config.isEdit ? 'atualizado' : 'incluído'
          } com sucesso!`,
        });
        this.dialogRef.close('reloadList');
      },
      (err: HttpErrorResponse) => this.submitLoader$.next(false)
    );
  }
}
