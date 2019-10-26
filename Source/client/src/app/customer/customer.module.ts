import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerLayoutFooterComponent } from './customer-layout/customer-layout-footer/customer-layout-footer.component';
import { CustomerLayoutHeaderComponent } from './customer-layout/customer-layout-header/customer-layout-header.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomerLayoutFooterComponent,
    CustomerLayoutHeaderComponent,
    CustomerLayoutComponent,
    CustomerHomeComponent,
    CustomerProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
