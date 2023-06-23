import jwtDecode from 'jwt-decode';
import jwtEncode from 'jwt-encode';

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs/internal/observable/interval';
import { TokenFactory } from '../../factory/token.factory';

export interface CatOAuth2TokenInterface {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  login: string;
  expired: number;
  code: string;
}

export interface CatJwtTokenInterface {
  id: number;
  login: string;
  iat: number;
  exp: number;
}

@Injectable({ providedIn: 'any' })
export class CatTokenService implements OnDestroy {
  private token$ = new BehaviorSubject<string>(null);
  private intervalToken: Subscription;

  constructor() {
    this.verifySession();
  }

  ngOnDestroy() {
    this.intervalToken?.unsubscribe();
  }

  public setToken(token: string) {
    if (TokenFactory.hasToken()) {
      this.token$.next(token);
    }
    TokenFactory.setToken(token);
  }

  public setDecodedToken(data: any, secret: string) {
    this.setToken(jwtEncode(data, secret));
  }

  public getToken(): BehaviorSubject<string | null> {
    return this.token$;
  }

  public getDecodedToken<T>(): T | null {
    return TokenFactory.hasToken() ? jwtDecode(TokenFactory.getToken()) : null;
  }

  public getOAuth2Token(): CatOAuth2TokenInterface | null {
    return TokenFactory.hasToken() ? jwtDecode(TokenFactory.getToken()) : null;
  }

  public getOAuth2DecodedToken() {
    return jwtDecode(this.getOAuth2Token().idToken) as any;
  }

  public removeToken() {
    TokenFactory.removeToken();
    this.token$.next(null);
  }

  private verifySession() {
    TokenFactory.init();
    this.token$.next(TokenFactory.getToken());
    this.intervalToken = interval(300).subscribe(() => {
      if (!TokenFactory.hasToken() && this.token$.getValue()) {
        this.token$.next(null);
      } else if (TokenFactory.hasToken() && !this.token$.getValue()) {
        this.token$.next(TokenFactory.getToken());
      }
    });
  }
}
