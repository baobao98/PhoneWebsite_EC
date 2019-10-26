import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './layout/admin-footer/admin-footer.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminLayoutComponent,
    DashboardComponent,
    ProductListComponent,
    ProductDetailComponent,
    OrderListComponent,
    OrderDetailComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    AdminProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
