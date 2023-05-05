import { Injectable } from '@angular/core';
import { HashLocationStrategy } from '@angular/common';
import { CatEnvironment } from '@catrx/ui/common';

@Injectable()
export class CatOAuth2HashLocationStrategy extends HashLocationStrategy {
  override prepareExternalUrl(internal: string): string {
    const hasToken = !!localStorage.getItem(
      CatEnvironment.environment?.storageTokenName
    );
    return !hasToken
      ? window.location.search + super.prepareExternalUrl(internal)
      : super.prepareExternalUrl(internal);
  }
}
