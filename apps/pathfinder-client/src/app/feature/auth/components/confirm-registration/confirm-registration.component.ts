import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthFacade } from '../../data-access/store/auth.facade';
import { firstValueFrom } from 'rxjs';
import { AttemptVerificationFunction } from '../../data-access/store/auth.state';
import { ClerkService } from '../../data-access/services/clerk.service';
import { NotificationService } from '../../../../shared/features/notification/service/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ReactiveFormService } from '../../../../shared/features/forms/services/reactive-form.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrl: './confirm-registration.component.css',
})
export class ConfirmRegistrationComponent implements OnInit {
  private authFacade = inject(AuthFacade)
  private signUpPrepare$ = this.authFacade.signUpPrepare$
  private signUpAttempt$ = this.authFacade.signUpAttempt$
  private clerkService = inject(ClerkService)
  private router = inject(Router)
  private notificationService = inject(NotificationService)
  private translateService = inject(TranslateService)
  private formService = inject(ReactiveFormService)

  public getErrors = this.formService.getFieldsErrors
  public displayErrors = this.formService.displayFieldsErrors
  
  public confirmForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  public ngOnInit(): void {
    if (this.clerkService.isAuthenthicated) {
      this.router.navigate([''])
    }
  }

  public async attemptAgain() {
    const signUpPrepare = await firstValueFrom(this.signUpPrepare$);

    signUpPrepare && signUpPrepare({ strategy: 'email_code' }).then((signUp) => {
      this.notificationService.addNotification(this.translateService.instant('auth.code_sent'), 'Success');
      this.authFacade.saveVerificationAttempt(signUp.attemptEmailAddressVerification as AttemptVerificationFunction);
    }).catch(() => {
      this.notificationService.addNotification(this.translateService.instant('auth.error_preparing_verification'), 'Failure');
    })
  }

  public async verify(code: string) {
    const signUpAttempt = await firstValueFrom(this.signUpAttempt$);

    signUpAttempt && signUpAttempt({ code }).then((signUp) => {
      if (signUp.status === 'complete') {
        this.notificationService.addNotification(this.translateService.instant('auth.verified_success'), 'Success');
        this.router.navigate([''])
      } else {
        signUp.status && this.notificationService.addNotification(signUp.status, 'Failure');
      }
    }).catch(e => {
      const code = e?.errors?.[0]?.code
      this.notificationService.addNotification(this.translateService.instant(code ? 'auth.validation.' + code :
        'auth.error_attempting_verification'), 'Failure');
    })
  }

  public async onSubmit() {
    const code = this.confirmForm.controls.code.value
    code && this.verify(code)
  }
}
