import { Directive, OnDestroy, OnInit } from '@angular/core';
import { CatDynamicComponentDataInterface } from '@catrx/ui/dynamic-component';
import { CatFormCustomSelectedFileList } from '@catrx/ui/form';
import { CatFileInterface } from '@catrx/ui/utils';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

@Directive()
export abstract class CatInputFileSelectedListBase<
  SelectItemType = CatFileInterface
> implements CatDynamicComponentDataInterface, OnInit, OnDestroy
{
  data?: CatFormCustomSelectedFileList<SelectItemType[]>;
  protected destroySubscriptions$ = new Subject<boolean>();

  selectedFiles$ = new BehaviorSubject<SelectItemType[]>([]);

  ngOnDestroy(): void {
    this.destroySubscriptions$.next(true);
  }

  ngOnInit(): void {
    this.selectedFiles$.next(this.data?.data ?? []);
  }

  getBase64ImageURL(image: SelectItemType) {
    return `data:${image['type']};base64,${image['base64']}`;
  }

  removeImage(index: number) {
    this.data?.remove(index);
  }
}
