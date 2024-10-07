import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthModule } from './feature/auth/auth.module';
import { environment } from '../environment/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Action, ActionReducer, MetaReducer, provideStore } from '@ngrx/store'
import { AuthState } from './feature/auth/data-access/store/auth.state';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authReducer } from './feature/auth/data-access/store/auth.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import * as Sentry from "@sentry/angular";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

interface Reducer {
  auth: AuthState;
}

export function localStorageSyncReducer(
  reducer: ActionReducer<Reducer, Action>
): ActionReducer<Reducer, Action> {
  return localStorageSync({ keys: ['auth'] })(reducer);
}

const metaReducers: Array<MetaReducer<Reducer, Action>> = [
  localStorageSyncReducer,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideClientHydration(),
    provideStore(
      { auth: authReducer },
      { metaReducers }
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    importProvidersFrom(TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    ),
    importProvidersFrom(AuthModule.forRoot({
      clerkPublishableKey: environment.CLERK_PK,
      serverUrl: environment.SERVER_URL,
    })),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => { },
      deps: [Sentry.TraceService],
      multi: true,
    },

  ],
};

