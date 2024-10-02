import { AfterContentInit, Component, inject } from '@angular/core';
import { ClerkService } from '../../data-access/services/clerk.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '../../data-access/store/auth.facade';
import { AttemptVerificationFunction, PrepareVerificationFunction } from '../../data-access/store/auth.state';
import { NotificationService } from '../../../../shared/features/notification/service/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ReactiveFormService } from '../../../../shared/features/forms/services/reactive-form.service';

const SOCIAL_ACC_EXISTS = 'external_account_exists'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements AfterContentInit {
  private clerkService = inject(ClerkService)
  private authFacade = inject(AuthFacade)
  private router = inject(Router)
  private notificationService = inject(NotificationService)
  private translateService = inject(TranslateService)
  private formService = inject(ReactiveFormService)

  public getErrors = this.formService.getFieldsErrors
  public displayErrors = this.formService.displayFieldsErrors

  public registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngAfterContentInit(): void {
    if (this.clerkService.isAuthenthicated) {
      this.router.navigate([''])
    }
    
    const errorCode = this.clerkService.clerk?.client?.signUp?.verifications?.externalAccount?.error?.code
    const authStrategy = this.clerkService?.clerk?.client?.signUp.verifications.externalAccount.strategy

    if (errorCode === SOCIAL_ACC_EXISTS && authStrategy) {
      this.clerkService.socialSSO(
        authStrategy.includes('google')
          ? 'google' : 'facebook', 'signIn'
      )
    }
  }

  public onSubmit() {
    const { email, username, password } = this.registerForm.value

    this.clerkService.signUp(email!, username!, password!)?.then((signUp) => {
      if (signUp.emailAddress && signUp.unverifiedFields.includes('email_address')) {
        signUp.prepareEmailAddressVerification({ strategy: 'email_code' }).then(() => {
          this.authFacade.saveSignUpPrepare(signUp.preparePhoneNumberVerification as PrepareVerificationFunction);
          this.authFacade.saveVerificationAttempt(signUp.attemptEmailAddressVerification as AttemptVerificationFunction);
          this.router.navigate(['auth/confirm']);
        }).catch(() => {
          this.notificationService.addNotification(this.translateService.instant('auth.error_preparing_verification'),
            'Failure')
        })
      }
    }).catch(e => {
      for (const error of e.errors) {
        let control;

        switch (error?.meta?.paramName) {
          case 'email_address':
            control = this.registerForm.controls.email;
            break;
          case 'username':
            control = this.registerForm.controls.username;
            break;
          case 'password':
            control = this.registerForm.controls.password;
            break;
          default:
            this.notificationService.addNotification(this.translateService.instant('auth.validation.' + error.code), 'Failure')
        }

        control && control.setErrors({
          [error.code]: true
        })

      }
    })
  }

  public socialSignUp(provider: Parameters<typeof this.clerkService.socialSSO>[0]) {
    this.clerkService.socialSSO(provider, 'signUp')?.catch(() => {
      this.notificationService.addNotification(this.translateService.instant('shared.generic_error'),
        'Failure')
    })
  }
}
