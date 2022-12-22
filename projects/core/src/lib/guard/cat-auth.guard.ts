import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenFactory } from '../factory/token.factory';
import { CatTokenService } from '../services/token/cat-token.service';

@Injectable()
export class CatAuthGuard implements CanActivate {
  constructor(private tokenService: CatTokenService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    if (TokenFactory.hasToken()) {
      return true;
    }

    return false;
  }
}
