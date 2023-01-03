import { Directive } from '@angular/core';
import { CatDatatableSelection, CatDatatableService, DatatableConfig } from '@catrx/ui/datatable';
import { CatFormConfig, CatFormService } from '@catrx/ui/form';
import { CatComponentBase } from './cat-component.base';
import { CatServiceBase } from './cat-service.base';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CatDialogService, CatDialogSize } from '@catrx/ui/dialog';
import { CatDialogFormComponent } from '../components/dialog-form/cat-dialog-form.component';
import { CatDialogFormConfig } from '../components/dialog-form/cat-dialog-form.interface';
import { CatConfirmService } from '@catrx/ui/confirm';
import { CatCsvService } from '@catrx/ui/utils';

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
  protected filterValueChanges$ = new BehaviorSubject<any>(null);
  protected selection?: CatDatatableSelection<EntityType>;
  protected datasource?: EntityType[];
  public abstract listConfig: DatatableConfig<EntityType>;

  constructor(
    protected readonly formService: CatFormService,
    protected readonly datatableService: CatDatatableService,
    protected readonly service: CatServiceBase,
    protected readonly dialogService?: CatDialogService,
    protected readonly confirmService?: CatConfirmService,
    protected readonly exportService?: {
      csv?: CatCsvService;
    }
  ) {
    super();
  }

  deleteSelected() {
    if (this.confirmService) {
      this.confirmService.ask(
        'Você realmente deseja excluir os itens selecionados?',
        () => {
          this.service
            .deleteMany(this.selection?.selected?.map((item) => item.item['id']))
            .subscribe({
              next: () => {
                this.reloadList(false);
              },
              error: () => { },
            });
        }
      );
    }
  }

  abstract export(filename: string): void;

  protected exportCsv(mapItem: (item: EntityType) => any, filename: string) {
    if (this.exportService?.csv) {
      if (this.listConfig.typeDataList === 'all' && this.datasource) {
        this.exportService.csv.convertJsonToCsv(
          this.datasource.map(mapItem),
          filename
        );
      }
    }
  }

  protected exportXlsx(mapItem: (item: EntityType) => any, filename: string) {
    throw new Error('Método indisponível nesta versão.');
  }

  protected openFormDialog(
    formConfig: CatFormConfig<EntityType>,
    isEdit: boolean,
    options?: DialogFormOptions
  ) {
    if (this.dialogService) {
      this.dialogService.open(CatDialogFormComponent, {
        size: options?.size ?? 'small',
        data: {
          formConfig,
          isEdit,
          title: options?.title,
        } as CatDialogFormConfig,
        closeTrigger: 'reloadList',
        callbackCloseTrigger: () => this.reloadList(),
      });
    }
  }

  protected reloadList(preservePagination = false) {
    this.listConfig?.reloadList?.next({
      preservePagination,
      reload: true,
    });
  }
}
