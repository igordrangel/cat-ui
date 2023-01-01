import { Directive } from '@angular/core';
import { CatDatatableService } from '@catrx/ui/datatable';
import { CatFormConfig, CatFormService } from '@catrx/ui/form';
import { CatComponentBase } from './cat-component.base';
import { CatServiceBase } from './cat-service.base';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CatDialogService, CatDialogSize } from '@catrx/ui/dialog';
import { CatDialogFormComponent } from '../components/dialog-form/cat-dialog-form.component';
import { CatDialogFormConfig } from '../components/dialog-form/cat-dialog-form.interface';

interface DialogFormOptions {
  size?: CatDialogSize;
  title?: string;
}

@Directive()
export abstract class CatCRUDComponentBase<
  FilterDataType = any,
  EntityType = any
> extends CatComponentBase {
  protected filterFormBuilder = this.formService.build<FilterDataType>();
  protected filterValueChanges$ = new BehaviorSubject<FilterDataType>(null);

  constructor(
    protected readonly formService: CatFormService,
    protected readonly datatableService: CatDatatableService,
    protected readonly dialogService: CatDialogService,
    protected readonly service: CatServiceBase
  ) {
    super();
  }

  protected openFormDialog(
    formConfig: CatFormConfig<EntityType>,
    isEdit: boolean,
    options?: DialogFormOptions
  ) {
    this.dialogService.open(CatDialogFormComponent, {
      size: options?.size ?? 'small',
      data: {
        formConfig,
        isEdit,
        title: options?.title,
      } as CatDialogFormConfig,
      closeTrigger: 'reloadList',
      callbackCloseTrigger: () => {},
    });
  }
}
