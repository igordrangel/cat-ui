import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { koala } from "@koalarx/utils";

export declare type Permission = 'denied' | 'granted' | 'default';

export interface PushNotification {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}

@Injectable({providedIn: 'root'})
export class NotificationService {
  private permission = false;

  public notify(title: string, options: PushNotification): Observable<{
    notification: Notification;
    event: Event
  }> {
    return this.create(title, options);
  }

  public requestPermission(): void {
    if (Notification.permission === 'granted') {
      this.permission = true;
    } else {
      Notification.requestPermission().then();
    }
  }

  private create(title: string, options: PushNotification): any {
    return new Observable((obs) => {
      if (!this.permission) {
        obs.complete();
      }

      if (!document.hasFocus()) {
        options = koala(options).object().merge({
          requireInteraction: false,
          renotify: false,
          tag: 'ChatBot Alexia'
        }).getValue();
        const notify = new Notification(title, options);
        notify.onshow = (e) => {
          return obs.next({
            notification: notify,
            event: e
          });
        };
        notify.onclick = (e) => {
          window.focus();
          return obs.next({
            notification: notify,
            event: e
          });
        };
        notify.onerror = (e) => {
          return obs.error({
            notification: notify,
            event: e
          });
        };
      }
    });
  }
}
