import { Injectable } from '@angular/core';
import { CatFileInterface } from '../interfaces/cat-file.interface';
import b64toBlob from 'b64-to-blob';

@Injectable({ providedIn: 'any' })
export class CatFileService {
  public getContentOnFile(file: CatFileInterface) {
    return window.atob(file.base64);
  }

  public downloadBase64File(file: CatFileInterface) {
    const link = document.createElement('a');
    link.setAttribute(
      'href',
      URL.createObjectURL(this.getBlobFile(file.base64, file.type))
    );
    link.setAttribute('download', file.filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public viewPdf(file: CatFileInterface) {
    const link = document.createElement('a');
    link.setAttribute(
      'href',
      URL.createObjectURL(this.getBlobFile(file.base64, 'application/pdf'))
    );
    link.setAttribute('target', '_blank');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public getBlobFile(base64: string, type: string): Blob {
    return b64toBlob(base64, type);
  }
}
