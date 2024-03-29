import { Injectable } from '@angular/core';
import { CatDialogService } from '@catrx/ui/dialog';
import { CatDynamicComponent } from '@catrx/ui/dynamic-component';
import { CatAlertComponent } from './cat-alert.component';

export type CatAlertType = 'success' | 'warning' | 'error' | 'info';
export interface CatAlertConfig {
  type: CatAlertType;
  message: string;
  icon?: CatDynamicComponent;
}

@Injectable({ providedIn: 'root' })
export class CatAlertService {
  constructor(private dialogService: CatDialogService) {}

  show(config: CatAlertConfig) {
    this.dialogService.open(CatAlertComponent, {
      size: 'small',
      data: config,
    });
  }
}
