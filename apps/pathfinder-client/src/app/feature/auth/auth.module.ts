import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClerkService } from './data-access/services/clerk.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { LoginComponent } from './components/login/login.component';

const providers: never[] = [];

export interface AuthOptions {
  clerkPublishableKey: string;
  serverUrl: string;
}

@NgModule({
  declarations: [RegisterComponent, ConfirmRegistrationComponent, LoginComponent],
  imports: [CommonModule, AuthRoutingModule, TranslateModule, ReactiveFormsModule],
})
export class AuthModule {
  static forRoot(opts: AuthOptions): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (ClerkService: ClerkService) => {
            return async () =>
              await ClerkService.load(opts.clerkPublishableKey);
          },
          deps: [ClerkService],
          multi: true,
        },
        ...providers,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    };
  }
}
