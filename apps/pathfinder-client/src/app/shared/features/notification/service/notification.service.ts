import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';

export interface Notification { notification: string, type: 'Success' | 'Failure' }

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notificationQueue$ = new BehaviorSubject<Notification[] | undefined>(undefined);
  public emissionTimestamp = new Date();
  public displayInfo$ = new Subject<Notification | undefined>();

  constructor() {
    this.notificationQueue$.subscribe(notifications => {
      if (notifications) {
        this.displayNotification();
      }
    });
  }

  public addNotification(notification: string, type: 'Success' | 'Failure') {
    const currentQueue = this.notificationQueue$.getValue();
    this.notificationQueue$.next(currentQueue ? currentQueue.concat({ notification, type }) : [{ notification, type }]);

    setTimeout(() => {
      this.dismissNotification();
    }, 5000);
  }

  public displayNotification() {
    this.displayInfo$.next(this.notificationQueue$?.getValue()?.[0]);
  }

  public dismissNotification() {
    const currentQueue = this.notificationQueue$.getValue();
    currentQueue?.shift();
    this.notificationQueue$.next(currentQueue);

    if (this.notificationQueue$.getValue()?.length) {
      this.displayNotification();
    }
  }
}
