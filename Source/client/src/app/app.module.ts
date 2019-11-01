import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DataService } from './services/data-service';
import { HttpClientCustom } from './services/http-client';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)},
  { path: 'home',   redirectTo: '/customer/home', pathMatch: 'full' },
  { path: '',   redirectTo: '/customer', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  // {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
];


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    // ProfileComponent,
    // LoginComponent,
    // RegisterComponent,
    // HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AuthModule,
    AdminModule,
    CustomerModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    DataService,
    HttpClientCustom
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
