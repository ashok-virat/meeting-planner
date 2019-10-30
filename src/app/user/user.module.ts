import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SigninComponent, SignupComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild ([
      {path:"signup",component:SignupComponent},
      {path:"signin",component:SigninComponent},
      {path:"reset-password",component:ResetPasswordComponent}
    ])
  ]
})
export class UserModule { }
