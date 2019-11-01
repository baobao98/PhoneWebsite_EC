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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ProductTypeListComponent } from './product-type/product-type-list/product-type-list.component';
import { ProductTypeDetailComponent } from './product-type/product-type-detail/product-type-detail.component';
import { SettingInformationComponent } from './setting-information/setting-information.component';


registerLocaleData(en);

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
    AdminProfileComponent,
    ProductTypeListComponent,
    ProductTypeDetailComponent,
    SettingInformationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    //BrowserAnimationsModule,
    AdminRoutingModule,
    /** import ng-zorro-antd root module，you should import NgZorroAntdModule and avoid importing sub modules directly **/
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ProductTypeDetailComponent,
    ProductDetailComponent
  ],
  /** config ng-zorro-antd i18n (language && date) **/
  providers   : [
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class AdminModule { }
