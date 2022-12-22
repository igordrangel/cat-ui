import jwt from 'jwt-decode';

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

  public getToken(): BehaviorSubject<string|null> {
    return this.token$;
  }

  public getDecodedToken<T>(): T | null {
    return TokenFactory.hasToken() ? jwt(TokenFactory.getToken()) : null;
  }

  public getOAuth2Token(): CatOAuth2TokenInterface | null {
    return TokenFactory.hasToken() ? jwt(TokenFactory.getToken()) : null;
  }

  public removeToken() {
    TokenFactory.removeToken();
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
