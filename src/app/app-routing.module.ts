import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductComponent } from './components/all-product/all-product.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { DetailResolver } from './components/details/detail.resolver';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from "./services/auth.guard";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'catalog', component: AllProductComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'details/:id', component: DetailsComponent, resolve:{data : DetailResolver}},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
