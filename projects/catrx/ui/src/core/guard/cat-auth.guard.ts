import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TokenFactory } from '../factory/token.factory';
import { CatRoutePolice } from './cat-route.police';
import { CatEnvironment } from '@catrx/ui/common';

@Injectable()
export class CatAuthGuard {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (localStorage.getItem(CatEnvironment.environment?.storageTokenName)) {
      return CatRoutePolice.hasPermission(state.url);
    }

    return false;
  }
}
