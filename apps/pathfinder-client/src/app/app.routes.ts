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
];
