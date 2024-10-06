import { Route } from '@angular/router';
import { urls } from './shared/consts/urls';

export const appRoutes: Route[] = [
  {
    path: urls.AUTH,
    loadChildren: () =>
      import('./feature/auth/auth.module').then(
      (m) => m.AuthModule
      ),
  },
  {
    path: urls.HOME,
    loadChildren: () =>
      import('./home/home.module').then(
      (m) => m.HomeModule
      ),
  },
];
