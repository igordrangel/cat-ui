import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DatatableActionButtonConfig,
  DatatableConfig,
  DatatableFilterResponse,
  DatatableSelection
} from "./cat-datatable.interface";
import { BehaviorSubject, first, Subject, takeUntil } from "rxjs";
import { koala } from "@koalarx/utils";
import { clone } from "@koalarx/utils/operators";

@Component({
  selector: 'cat-datatable',
  templateUrl: 'datatable.component.html',
  styleUrls: ['datatable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableComponent implements OnInit, OnDestroy {
  @Input() config?: DatatableConfig<any>;

  public selection$ = new BehaviorSubject<DatatableSelection<any>>({
    data: [],
    lastSelected: null,
    selected: [],
    emit: false,
    checkAll: false
  });
  public datatableList$ = new BehaviorSubject<any[]>([]);
  public loadedList$ = new BehaviorSubject<boolean>(false);
  public datatableBackupList$ = new BehaviorSubject<any[]>([]);
  public destroySubscriptions$ = new Subject();

  public textFilter?: string;
  public objectFilter?: any;

  public currentPage = 1;
  public totalItemsPage = 0;
  public totalItemsBd = 0;
  public columnIndexSort = -1;
  public orderBy = '';
  public reverse = false;

  ngOnDestroy() {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit(): void {
    this.watchFilter();
    this.observeAnEmitSelection();
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
        .subscribe(filter => {
          if (typeof filter === 'string') {
            this.textFilter = filter;
          } else if (typeof filter === 'object') {
            this.objectFilter = filter;
          }

          switch (this.config?.typeDataList) {
            case "all":
              if (this.datatableList$.getValue().length === 0) this.loadData();
              break;
            case "onDemand":
              this.loadData();
              break;
          }
        });
    }
  }

  private loadData() {
    console.log(this.datatableList$.getValue())
    if (this.config?.service) {
      this.loadedList$.next(false);
      this.config
          .service(this.getFilter())
          .pipe(first())
          .subscribe({
            next: (response: any[]) => {
              const listData = (this.config?.listPropName ? response[this.config?.listPropName as any] : response);
              this.datatableList$.next(listData);
              this.datatableBackupList$.next(clone(listData));
              this.totalItemsBd = (this.config?.listQtyPropName ? response[this.config?.listQtyPropName as any] : response.length);
              this.totalItemsPage = koala(listData)
                .array()
                .split(this.config?.limitItemPerPage ?? 30)
                .getValue()[0]
                ?.length;

              if (this.config?.getDatasource) this.config.getDatasource(listData);

              this.loadedList$.next(true);
            },
            error: () => {
              this.loadedList$.next(true);
            }
          });
    }
  }

  private getFilter() {
    let filter = {
      page: this.currentPage,
      orderBy: this.orderBy,
      direction: this.reverse ? 'desc' : 'asc'
    } as DatatableFilterResponse;

    if (this.textFilter) {
      filter['filter'] = this.textFilter;
    } else if (this.objectFilter) {
      filter = {
        ...filter,
        ...this.objectFilter
      }
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
        : (this.columnIndexSort !== columnIndex ? false : !this.reverse);
      this.columnIndexSort = columnIndex;
    }
  }

  //#endregion

  //#region [Selection List Control]
  public isChecked(index: number) {
    const selection = this.selection$.getValue();
    return selection ? !!selection.selected.find(selectItem => selectItem.index === index) : false;
  }

  public toggleItem(index: number, item: any, forceCheck: boolean = false, emit: boolean = true, checkAll: boolean = false) {
    const selection = this.selection$.getValue();
    const itemSelection = {index, item};
    selection.emit = emit;
    selection.checkAll = checkAll;
    selection.lastSelected = itemSelection;

    if (this.isChecked(index) && !forceCheck) {
      selection.selected = koala(selection.selected).array<any>().map(selectItem => {
        if (selectItem.index === index) {
          return null;
        }
        return selectItem;
      }).clearEmptyValues().getValue();
    } else if (!this.isChecked(index)) {
      selection.selected.push(itemSelection);
    }

    this.selection$.next(selection);
  }

  public checkAll(checked: boolean) {
    const selection = this.selection$.getValue();

    if (checked) {
      this.getItemsOnCurrentPage().forEach((itemList, index) => this.toggleItem(index, itemList, checked, false));
    } else {
      selection.selected = [];
    }

    selection.emit = true;
    selection.checkAll = checked;
    this.selection$.next(selection);
  }

  public isAllChecked() {
    const selection = this.selection$.getValue();
    return selection ? selection?.selected?.length === this.getItemsOnCurrentPage()?.length : false;
  }

  public isIndeterminateSelection() {
    const selection = this.selection$.getValue();
    return !this.isAllChecked() && selection.selected.length > 0;
  }

  private getItemsOnCurrentPage() {
    let page = this.currentPage - 1;
    if (page < 0) page = 0;

    return koala(this.datatableList$.getValue())
      .array<any>()
      .split(this.config?.limitItemPerPage ?? 30)
      .getValue()[page];
  }

  private observeAnEmitSelection() {
    if (this.config?.getSelection && this.config?.hasSelection) {
      this.selection$
          .pipe(takeUntil(this.destroySubscriptions$))
          .subscribe(selection => {
            selection.data = this.datatableList$.getValue();
            if (selection.emit && this.config?.getSelection) {
              this.config.getSelection(selection);
            }
          });
    }
  }

  //#endregion

  //#region [List Control]
  public getActionButtons(rowData: any): DatatableActionButtonConfig<any>[] {
    return this.config?.actionButtons?.filter(btn =>
      (btn.havePermission === undefined || btn.havePermission) &&
      (btn.showBtn ? btn.showBtn(rowData) : true)
    ) ?? [];
  }

  public getItemLine(columnIndex: number) {
    return this.config?.data?.find(item => item.columnIndex === columnIndex);
  }

  public getItemLineComponent(columnIndex: number) {
    const itemLine = this.getItemLine(columnIndex);

    if (itemLine && itemLine.component) {
      return itemLine.component(itemLine);
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
      totalItems: (this.totalItemsBd
        ? this.totalItemsBd
        : this.datatableList$.getValue()?.length)
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
      this.loadData();
    } else {
      this.checkAll(false);
    }
  }

  //#endregion
}
