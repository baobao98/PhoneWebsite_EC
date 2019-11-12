import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from '../services/authentication.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { LoginSocialComponent } from './login-social/login-social.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginSocialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ]
})
export class AuthModule { }
