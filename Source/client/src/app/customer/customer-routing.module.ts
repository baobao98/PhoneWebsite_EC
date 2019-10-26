import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component';
import { LoginComponent } from '../auth/login/login.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  { path: '', component: CustomerLayoutComponent, children: [
    { path: 'home', component: HomeComponent},
    { path: '', component: HomeComponent, pathMatch: 'full' },
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
