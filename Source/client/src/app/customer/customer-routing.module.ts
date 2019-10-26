import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';

//
const routes: Routes = [
  { path: '', component: CustomerLayoutComponent, children: [
    { path: 'home', component: CustomerHomeComponent},
    { path: 'profile', component: CustomerProfileComponent, canActivate: [AuthGuardService]},
    { path: '', component: CustomerHomeComponent, pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    //AuthGuardService,
    //AuthenticationService
  ]
})
export class CustomerRoutingModule { }
