import { Injectable } from '@angular/core';
import { CatFileInterface } from '../interfaces/cat-file.interface';

@Injectable({ providedIn: 'any' })
export class CatObjectService {
  public getContentOnFile(file: CatFileInterface) {
    return window.atob(file.base64);
  }
}
