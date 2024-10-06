import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotificationComponent } from './shared/features/notification/component/notification.component';
import { NavComponent } from './feature/nav/components/nav/nav.component';
import { HomeModule } from './home/home.module';
import { EmptyStateComponent } from './shared/features/empty-state/component/empty-state.component';

@Component({
  standalone: true,
  imports: [RouterModule, TranslateModule, NotificationComponent, EmptyStateComponent, NavComponent, HomeModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public translateService = inject(TranslateService)
  title = 'pathfinder-client';
}
