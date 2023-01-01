import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { CatDialogModule, CatDialogRef, CAT_DIALOG_DATA } from "@catrx/ui/dialog";
import { CatFormModule } from "@catrx/ui/form";
import { CatDialogFormConfig } from "./cat-dialog-form.interface";

@Component({
  template: `<form
    (submit)="
      $event.preventDefault(); form.submit(); dialogRef.close('reloadList')
    "
  >
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
        {{ (config?.isEdit ? 'Editar ' : 'Incluir ') + (config?.title ? config?.title : '') }}
      </div>
      <div content>
        <cat-form #form [config]="config?.formConfig"></cat-form>
      </div>
      <div actions>
        <button
          (click)="dialogRef.close()"
          type="button"
          class="btn btn-secondary btn-sm mr-8"
        >
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary btn-sm">Salvar</button>
      </div>
    </cat-dialog>
  </form>`,
  standalone: true,
  imports: [CommonModule, CatDialogModule, CatFormModule],
})
export class CatDialogFormComponent {
  constructor(
    public dialogRef: CatDialogRef<CatDialogFormComponent>,
    @Inject(CAT_DIALOG_DATA) public config: CatDialogFormConfig
  ) {}
}
