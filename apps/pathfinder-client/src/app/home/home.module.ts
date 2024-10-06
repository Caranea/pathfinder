import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyStateComponent } from '../shared/features/empty-state/component/empty-state.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { NavComponent } from '../feature/nav/components/nav/nav.component';

@NgModule({
  declarations: [HomePageComponent,  PlaceholderComponent],
  imports: [
    EmptyStateComponent,
    CommonModule,
    TranslateModule,
    HomeRoutingModule,
    NavComponent,
  ],
  exports: [HomePageComponent]
})
export class HomeModule { }
