import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, children: [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'product', component: ProductListComponent},
    { path: 'order', component: OrderListComponent},
    { path: 'customer', component: CustomerListComponent},
    { path: '', component: DashboardComponent, pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
