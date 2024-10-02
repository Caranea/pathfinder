import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Notification, NotificationService } from '../service/notification.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  private readonly notificationService = inject(NotificationService);
  public display$ = this.notificationService.displayInfo$;
  public notification?: Notification;

  constructor() {
    this.notificationService.displayInfo$.subscribe(notification => this.notification = notification);
  }
  
  public dismiss() {
    this.notificationService.dismissNotification();
  }
}
