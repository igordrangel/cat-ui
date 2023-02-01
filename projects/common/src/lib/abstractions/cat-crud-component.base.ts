import { Directive } from '@angular/core';
import {
  CatDatatableSelection,
  CatDatatableService,
  DatatableConfig,
} from '@catrx/ui/datatable';
import { CatFormConfig, CatFormService } from '@catrx/ui/form';
import { CatComponentBase } from './cat-component.base';
import { CatServiceBase } from './cat-service.base';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CatDialogService, CatDialogSize } from '@catrx/ui/dialog';
import { CatDialogFormComponent } from '../components/dialog-form/cat-dialog-form.component';
import { CatDialogFormConfig } from '../components/dialog-form/cat-dialog-form.interface';
import { CatConfirmService } from '@catrx/ui/confirm';
import { CatCsvService } from '@catrx/ui/utils/src/lib/csv';
import { CatXlsxService } from '@catrx/ui/utils/src/lib/xlsx';
import { CatLoaderPageService } from '@catrx/ui/loader-page';
import { CatSnackbarService } from '@catrx/ui/snackbar';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

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
    protected readonly loaderService?: CatLoaderPageService,
    protected readonly snackbarService?: CatSnackbarService,
    protected readonly dialogService?: CatDialogService,
    protected readonly confirmService?: CatConfirmService,
    protected readonly exportService?: {
      csv?: CatCsvService;
      xlsx?: CatXlsxService;
    }
  ) {
    super();
  }

  deleteSelected() {
    if (this.confirmService) {
      this.confirmService.ask(
        'Você realmente deseja excluir os itens selecionados?',
        () => {
          this.loaderService?.show();
          this.service
            .deleteMany(
              this.selection?.selected?.map((item) => item.item['id'])
            )
            .subscribe({
              next: () => {
                this.reloadList(false);
                this.snackbarService?.open({
                  type: 'success',
                  openedTime: 5000,
                  title: 'Os itens selecionados foram removidos com sucesso!',
                });
                this.loaderService?.dismiss();
              },
              error: (err: HttpErrorResponse) => {
                this.snackbarService?.open({
                  type: err?.statusText?.startsWith('4') ? 'warning' : 'error',
                  title: 'Algo inesperado ocorreu...',
                  message: err?.message ?? 'Ocorreu um problema desconhecido.',
                });
                this.loaderService?.dismiss();
              },
            });
        }
      );
    }
  }

  abstract export(filename: string): void;

  protected exportByService(
    settings: {
      csv?: { filename: string };
      xlsx?: { filename: string; sheetName: string };
    },
    service: Observable<number | any[]>
  ) {
    this.loaderService?.show();
    const exportSubscription = service.subscribe((response) => {
      if (Array.isArray(response)) {
        this.loaderService?.dismiss();
        exportSubscription.unsubscribe();
        if (response.length > 0) {
          if (settings.csv) {
            this.exportCsv((item) => item, settings.csv.filename, response);
          } else if (settings.xlsx) {
            this.exportXlsx(
              (item) => item,
              settings.xlsx.filename,
              settings.xlsx.sheetName,
              response
            );
          }
        }
      } else {
        this.loaderService?.setProgress(response);
      }
    });
  }

  protected exportCsv(
    mapItem: (item: EntityType) => any,
    filename: string,
    customDatasource?: any[]
  ) {
    if (this.exportService?.csv) {
      if (this.datasource || customDatasource) {
        this.exportService.csv.convertJsonToCsv(
          (customDatasource ?? this.datasource).map(mapItem),
          filename
        );
      }
    }
  }

  protected exportXlsx(
    mapItem: (item: EntityType) => any,
    filename: string,
    sheetName: string,
    customDatasource?: any[]
  ) {
    if (this.exportService?.xlsx) {
      if (this.datasource || customDatasource) {
        this.exportService.xlsx.convertJsonToXlsx(
          [
            {
              sheetName,
              json: (customDatasource ?? this.datasource).map(mapItem),
            },
          ],
          filename
        );
      }
    }
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
