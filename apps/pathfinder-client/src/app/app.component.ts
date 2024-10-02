import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotificationComponent } from './shared/features/notification/component/notification.component';
import { NavComponent } from './feature/nav/components/nav/nav.component';

@Component({
  standalone: true,
  imports: [RouterModule, TranslateModule, NotificationComponent, NavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public translateService = inject(TranslateService)
  title = 'pathfinder-client';
}
