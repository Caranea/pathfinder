import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { urls } from '../../shared/consts/urls';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { LoginComponent } from './components/login/login.component';
import { RemindPasswordComponent } from './components/remind-password/remind-password.component';

const routes: Routes = [
  { path: urls.REGISTER, component: RegisterComponent },
  { path: urls.CONFIRM, component: ConfirmRegistrationComponent },
  { path: urls.LOGIN, component: LoginComponent },
  { path: urls.REMIND, component: RemindPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
