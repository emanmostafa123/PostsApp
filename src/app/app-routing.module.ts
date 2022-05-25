import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { VerifyComponent } from './views/verify/verify.component';
import { AuthGuard } from './guard/auth.guard';
import { StartComponent } from './views/start/start.component';

const routes: Routes = [
  { path: '', redirectTo: '/get-started', pathMatch: 'full' },
  {path:'',component:StartComponent},
  {path:'get-started',component:StartComponent},
  {path:'signin',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'verify',component:VerifyComponent},
  {path:'home',component:HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
