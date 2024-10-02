import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { urls } from '../../shared/consts/urls';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: urls.REGISTER, component: RegisterComponent },
  { path: urls.CONFIRM, component: ConfirmRegistrationComponent },
  { path: urls.LOGIN, component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
