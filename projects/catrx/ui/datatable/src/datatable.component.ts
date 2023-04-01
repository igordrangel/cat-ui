import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  DatatableActionButtonConfig,
  DatatableConfig,
  DatatableFilterResponse,
  CatDatatableSelection,
} from './cat-datatable.interface';
import { clone } from '@koalarx/utils/operators/object';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { klArray } from '@koalarx/utils/operators/array';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'cat-datatable[config]',
  templateUrl: 'datatable.component.html',
  styleUrls: ['datatable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableComponent implements OnInit, OnDestroy {
  @Input() config: DatatableConfig<any>;

  public selection$ = new BehaviorSubject<CatDatatableSelection<any>>({
    data: [],
    lastSelected: null,
    selected: [],
    emit: false,
    checkAll: false,
  });
  public datatableList$ = new BehaviorSubject<any[]>([]);
  public datatableBackupList$ = new BehaviorSubject<any[]>([]);
  public loadedList$ = new BehaviorSubject<boolean>(false);
  public destroySubscriptions$ = new Subject();

  public currentPage = 1;
  public totalItemsPage = 0;
  public totalItemsBd = 0;
  public columnIndexSort = -1;
  public orderBy = '';
  public reverse = false;

  private textFilter?: string;
  private objectFilter?: any;

  ngOnDestroy() {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit(): void {
    this.watchFilter();
    this.observeAnEmitSelection();
    if (this.config?.reloadList) {
      this.config?.reloadList
        .pipe(takeUntil(this.destroySubscriptions$))
        .subscribe((reloadlist) => {
          if (reloadlist.reload) this.loadData(reloadlist.preservePagination);
        });
    }
  }

  public getFooterColspan() {
    let colspan = 1;
    if (this.config?.hasSelection) {
      colspan++;
    }
    if (this.config?.hasAction) {
      colspan++;
    }

    return colspan;
  }

  //#region [Load Data Control]
  private watchFilter() {
    if (this.config) {
      (this.config.filter$ ?? new BehaviorSubject(null))
        .pipe(takeUntil(this.destroySubscriptions$))
        .subscribe((filter) => {
          if (typeof filter === 'string') {
            this.datatableList$.next(
              Ng2SearchPipe.filter(this.datatableBackupList$.getValue(), filter)
            );
          } else if (typeof filter === 'object') {
            this.objectFilter = filter;

            let filteredList = this.datatableBackupList$.getValue();
            filteredList = filteredList.filter((itemLine) => {
              const dataFiltered = [];
              Object.keys(filter).forEach((indexNameFilter) => {
                if (filter[indexNameFilter] && indexNameFilter !== 'filter') {
                  if (
                    typeof itemLine[indexNameFilter] === 'string' &&
                    typeof filter[indexNameFilter] === 'string'
                  ) {
                    dataFiltered.push(
                      itemLine[indexNameFilter].includes(
                        filter[indexNameFilter]
                      )
                    );
                  } else {
                    dataFiltered.push(
                      JSON.stringify(itemLine[indexNameFilter]) ===
                        JSON.stringify(filter[indexNameFilter]) ||
                        (itemLine[indexNameFilter]?.['id'] ?? 0) ===
                          (filter[indexNameFilter]?.['id'] ?? -1) ||
                        (itemLine[indexNameFilter]?.['codigo'] ?? 0) ===
                          (filter[indexNameFilter]?.['codigo'] ?? -1)
                    );
                  }
                }
              });

              return dataFiltered.filter((d) => d === false).length === 0;
            });
            this.datatableList$.next(filteredList);
          }

          switch (this.config?.typeDataList) {
            case 'all':
              if (this.datatableBackupList$.getValue().length === 0)
                this.loadData();
              break;
            case 'onDemand':
              this.loadData();
              break;
          }
        });
    }
  }

  private loadData(preserveCurrentPage = false) {
    if (this.config?.service) {
      if (!preserveCurrentPage) this.currentPage = 1;
      this.clearSelection();
      this.loadedList$.next(false);
      this.config
        .service(this.getFilter())
        .pipe(first())
        .subscribe({
          next: (response) => {
            const listData = response.items;
            this.datatableList$.next(listData);
            this.datatableBackupList$.next(clone(listData));
            this.totalItemsBd = response.count;
            this.totalItemsPage = klArray(listData)
              .split(this.config?.limitItemPerPage ?? 30)
              .getValue()[0]?.length;

            if (this.config?.getDatasource) this.config.getDatasource(listData);

            this.loadedList$.next(true);
          },
          error: () => {
            this.loadedList$.next(true);
          },
        });
    }
  }

  private getFilter() {
    let filter = {
      page: this.currentPage,
      orderBy: this.orderBy,
      direction: this.reverse ? 'desc' : 'asc',
    } as DatatableFilterResponse;

    if (this.textFilter) {
      filter['filter'] = this.textFilter;
    } else if (this.objectFilter) {
      filter = {
        ...filter,
        ...this.objectFilter,
      };
    }

    return filter;
  }

  //#endregion

  //#region [Order List Control]
  public isSortable(columnIndex: number) {
    return !!this.getItemLine(columnIndex)?.sortColumn;
  }

  public sort(columnIndex: number, reverse?: boolean) {
    this.checkAll(false);
    this.orderBy = this.getItemLine(columnIndex)?.sortColumn ?? '';
    if (this.orderBy) {
      this.reverse = reverse
        ? reverse
        : this.columnIndexSort !== columnIndex
        ? false
        : !this.reverse;
      this.columnIndexSort = columnIndex;
    }
  }

  //#endregion

  //#region [Selection List Control]
  public isChecked(index: number) {
    const selection = this.selection$.getValue();
    return selection
      ? !!selection.selected.find((selectItem) => selectItem.index === index)
      : false;
  }

  public toggleItem(
    index: number,
    item: any,
    forceCheck = false,
    emit = true,
    checkAll = false
  ) {
    if (
      (this.config?.disableSelectionItem &&
        !(this.config?.disableSelectionItem(item) ?? false)) ||
      !this.config?.disableSelectionItem
    ) {
      const selection = this.selection$.getValue();
      const itemSelection = { index, item };
      selection.emit = emit;
      selection.checkAll = checkAll;
      selection.lastSelected = itemSelection;

      if (this.isChecked(index) && !forceCheck) {
        selection.selected = klArray(selection.selected)
          .map((selectItem) => {
            if (selectItem.index === index) {
              return null;
            }
            return selectItem;
          })
          .clearEmptyValues()
          .getValue();
      } else if (!this.isChecked(index)) {
        selection.selected.push(itemSelection);
      }

      this.selection$.next(selection);
    }
  }

  public checkAll(checked: boolean) {
    const selection = this.selection$.getValue();

    if (checked) {
      this.getItemsOnCurrentPage().forEach((itemList, index) =>
        this.toggleItem(index, itemList, checked, false)
      );
    } else {
      selection.selected = [];
    }

    selection.emit = true;
    selection.checkAll = checked;
    this.selection$.next(selection);
  }

  public isAllChecked() {
    const selection = this.selection$.getValue();
    return selection
      ? selection?.selected?.length === this.getItemsOnCurrentPage()?.length
      : false;
  }

  public isIndeterminateSelection() {
    const selection = this.selection$.getValue();
    return !this.isAllChecked() && selection.selected.length > 0;
  }

  private getItemsOnCurrentPage() {
    let page = this.currentPage - 1;
    if (page < 0) page = 0;

    return klArray(this.datatableList$.getValue())
      .split(this.config?.limitItemPerPage ?? 30)
      .getValue()[page];
  }

  private observeAnEmitSelection() {
    if (this.config?.getSelection && this.config?.hasSelection) {
      this.selection$
        .pipe(takeUntil(this.destroySubscriptions$))
        .subscribe((selection) => {
          selection.data = this.datatableList$.getValue();
          if (selection.emit && this.config?.getSelection) {
            this.config.getSelection(selection);
          }
        });
    }
  }

  private clearSelection() {
    this.selection$.next({
      data: [],
      lastSelected: null,
      selected: [],
      emit: false,
      checkAll: false,
    });
  }

  //#endregion

  //#region [List Control]
  public getActionButtons(rowData: any): DatatableActionButtonConfig<any>[] {
    return (
      this.config?.actionButtons?.filter(
        (btn) =>
          (btn.havePermission === undefined || btn.havePermission) &&
          (btn.showBtn ? btn.showBtn(rowData) : true)
      ) ?? []
    );
  }

  public getItemLine(columnIndex: number) {
    return this.config?.data?.find((item) => item.columnIndex === columnIndex);
  }

  public getItemLineComponent(columnIndex: number, data: any) {
    const itemLine = this.getItemLine(columnIndex);

    if (itemLine && itemLine.component) {
      return itemLine.component(data);
    }

    return null;
  }

  public getItemLineText(columnIndex: number, rowData: any) {
    const itemLine = this.getItemLine(columnIndex);

    if (itemLine && itemLine.text) {
      return itemLine.text(rowData);
    }

    return null;
  }

  public getPaginateProps() {
    return {
      itemsPerPage: this.config?.limitItemPerPage ?? 30,
      currentPage: this.currentPage ?? 0,
      totalItems:
        this.totalItemsBd && this.config.typeDataList === 'onDemand'
          ? this.totalItemsBd
          : this.datatableList$.getValue()?.length,
    };
  }

  //#endregion

  //#region [Pagination Control]
  public handlePageSizeChange() {
    this.checkAll(false);
    this.handlePageChange(1);
  }

  public handlePageChange(page: number) {
    this.currentPage = page;
    if (this.config?.typeDataList === 'onDemand') {
      this.datatableList$.next([]);
      this.loadData(true);
    } else {
      this.checkAll(false);
    }
  }

  //#endregion
}
