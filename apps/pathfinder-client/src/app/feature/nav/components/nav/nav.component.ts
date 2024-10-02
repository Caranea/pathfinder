import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClerkService } from '../../../auth/data-access/services/clerk.service';
import { FormsModule } from '@angular/forms';
import { EMPTY, Subject, debounceTime, switchMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ClickOutsideModule } from 'ng-click-outside';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideModule, RouterLink, TranslateModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private clerkService = inject(ClerkService);
  private searchQuery$ = new Subject<string>();

  public activeTab = 'home';
  public searchInput = '';
  public dropdownMenuVisible = false;
  public mobileMenuVisible = false;
  public user = this.clerkService.currentUser

  constructor() {
    this.searchQuery$.pipe(
      untilDestroyed(this),
      debounceTime(500),
      switchMap((searchQuery) => {
        console.log('Here you could make your API call: ',searchQuery)
        return EMPTY
      }),
    ).subscribe()
  }

  public search() {
    this.searchQuery$.next(this.searchInput)
  }

  public signOut() {
    this.clerkService.signOut()
  }
}
