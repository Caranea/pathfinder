import {  Component, OnInit, inject } from '@angular/core';
import { ClerkService } from '../../data-access/services/clerk.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/features/notification/service/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ReactiveFormService } from '../../../../shared/features/forms/services/reactive-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private clerkService = inject(ClerkService)
  private router = inject(Router)
  private notificationService = inject(NotificationService)
  private translateService = inject(TranslateService)
  private formService = inject(ReactiveFormService)

  public getErrors = this.formService.getFieldsErrors
  public displayErrors = this.formService.displayFieldsErrors
  
  public loginForm = new FormGroup({
    identifier: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    if (this.clerkService.isAuthenthicated) {
      this.router.navigate([''])
    }
  }

  public onSubmit() {
    const { identifier, password } = this.loginForm.value

    this.clerkService.signIn(identifier!, password!)?.then((signIn) => {
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
          case 'identifier':
            control = this.loginForm.controls.identifier;
            break;
          case 'password':
            control = this.loginForm.controls.password;
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

  public socialSignIn(provider: Parameters<typeof this.clerkService.socialSSO>[0]) {
    this.clerkService.socialSSO(provider, 'signIn')?.then(res =>console.log('res,', res)).catch(() => {
      this.notificationService.addNotification(this.translateService.instant('shared.generic_error'),
        'Failure')
    })
  }
}
