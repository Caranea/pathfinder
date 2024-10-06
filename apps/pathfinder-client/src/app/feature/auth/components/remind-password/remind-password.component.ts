import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormService } from 'apps/pathfinder-client/src/app/shared/features/forms/services/reactive-form.service';
import { NotificationService } from 'apps/pathfinder-client/src/app/shared/features/notification/service/notification.service';
import { Router } from '@angular/router';
import { ClerkService } from '../../data-access/services/clerk.service';
import { AuthFacade } from '../../data-access/store/auth.facade';

@Component({
  selector: 'app-remind-password',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './remind-password.component.html',
  styleUrl: './remind-password.component.css',
})
export class RemindPasswordComponent {
  private clerkService = inject(ClerkService)
  private router = inject(Router)
  private notificationService = inject(NotificationService)
  private translateService = inject(TranslateService)
  private formService = inject(ReactiveFormService)

  public sent = false
  public enableResend = false
  public getErrors = this.formService.getFieldsErrors
  public displayErrors = this.formService.displayFieldsErrors

  public remindForm = new FormGroup({
    email: new FormControl('', Validators.required),
    code: new FormControl(''),
    password: new FormControl(''),
  });

  public ngOnInit(): void {
    if (this.clerkService.isAuthenthicated) {
      this.router.navigate([''])
    }
  }

  public sendCode(): void {
    this.enableResend = false;
    const { email } = this.remindForm.value

    this.clerkService.sendResetPasswordCode(email!)?.then((signIn) => {
      if (signIn.status === 'needs_first_factor') {
        this.notificationService.addNotification(this.translateService.instant('auth.code_sent'), 'Success');
        this.sent = true;
        this.remindForm.controls.code.setValidators(Validators.required);
        this.remindForm.controls.password.setValidators(Validators.required);
        setTimeout(() => {
          this.enableResend = true;
        }, 30 * 1000)
      } else {
        signIn.status && this.notificationService.addNotification(signIn.status, 'Failure');
      }
    }).catch(e => {
      for (const error of e.errors) {
        let control;

        switch (error?.meta?.paramName) {
          case 'identifier':
            control = this.remindForm.controls.email;
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

  private reset(): void {
    const { code, password } = this.remindForm.value

    this.clerkService.reset(code!, password!)?.then((signIn) => {
      if (signIn.status === 'complete') {
        this.notificationService.addNotification(this.translateService.instant('auth.login_successful'), 'Success');
        this.router.navigate([''])
      } else {
        signIn.status && this.notificationService.addNotification(signIn.status, 'Failure');
      }
    }).catch(e => {
      for (const error of e.errors) {
        let control;

        switch (error?.meta?.paramName) {
          case 'code':
            control = this.remindForm.controls.code;
            break;
          case 'password':
            control = this.remindForm.controls.password;
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


  public onSubmit(): void {
    this.sent ? this.reset() : this.sendCode()
  }
}
