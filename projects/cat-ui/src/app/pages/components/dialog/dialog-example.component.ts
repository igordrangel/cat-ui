import { Component, Inject, signal } from '@angular/core';
import {
  CatDialogRef,
  CatDialogService,
  CatDialogSize,
  CAT_DIALOG_DATA,
  CatDialogComponent,
} from '@catrx/ui/dialog';
import { CatFormModule, CatFormService } from '@catrx/ui/form';

interface FormData {
  text: string;
  size: CatDialogSize;
}

@Component({
  standalone: true,
  imports: [CatDialogComponent, CatFormModule],
  template: `
    <cat-dialog>
      <div header>Dialog</div>
      <div content>
        <span>{{ data }}</span>
        <cat-form class="d-block mt-10" [config]="formConfig()"></cat-form>
      </div>
      <div actions>
        <button
          (click)="close()"
          type="button"
          class="btn btn-secondary btn-sm mr-8"
        >
          Fechar
        </button>
        <button
          (click)="openAnother()"
          type="button"
          class="btn btn-primary btn-sm"
        >
          Abrir outro
        </button>
      </div>
    </cat-dialog>
  `,
})
export class DialogExampleComponent {
  formData: FormData;
  formConfig = signal(
    this.formService
      .build<FormData>()
      .text(
        'Inclua um texto para exibir no próximo Dialog',
        'text',
        (builder) => builder.generate()
      )
      .select('Tamanho do próximo Dialog', 'size', (builder) =>
        builder
          .setOptions([
            { value: 'small', name: 'Pequeno' },
            { value: 'medium', name: 'Médio' },
            { value: 'big', name: 'Grande' },
          ])
          .generate()
      )
      .onChange((value) => (this.formData = value))
      .generate()
  );

  constructor(
    @Inject(CAT_DIALOG_DATA) public data: string,
    private dialogRef: CatDialogRef,
    private dialogService: CatDialogService,
    private formService: CatFormService
  ) {}

  openAnother() {
    this.dialogService.open(DialogExampleComponent, {
      size: this.formData?.size,
      data: this.formData?.text,
    });
  }

  close() {
    this.dialogRef.close('showAlert');
  }
}
