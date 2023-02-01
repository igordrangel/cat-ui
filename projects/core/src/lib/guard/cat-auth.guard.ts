import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TokenFactory } from '../factory/token.factory';
import { CatRoutePolice } from './cat-route.police';

@Injectable()
export class CatAuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (TokenFactory.hasToken()) {
      return CatRoutePolice.hasPermission(state.url);
    }

    return false;
  }
}
