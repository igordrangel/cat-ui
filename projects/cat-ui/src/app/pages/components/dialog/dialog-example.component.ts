import { Component, Inject } from '@angular/core';
import { CatDialogRef, CatDialogService, CatDialogSize, CAT_DIALOG_DATA } from '@catrx/ui/dialog';
import { CatFormService } from '@catrx/ui/form';

interface FormData {
  text: string;
  size: CatDialogSize;
}

@Component({
  templateUrl: './dialog-example.component.html',
})
export class DialogExampleComponent {
  formData: FormData;
  formConfig = this.formService
    .build<FormData>()
    .text('Inclua um texto para exibir no próximo Dialog', 'text', (builder) =>
      builder.generate()
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
    .generate();

  constructor(
    @Inject(CAT_DIALOG_DATA) public data: string,
    private dialogRef: CatDialogRef<DialogExampleComponent>,
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
