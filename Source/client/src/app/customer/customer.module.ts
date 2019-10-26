import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerLayoutFooterComponent } from './customer-layout/customer-layout-footer/customer-layout-footer.component';
import { CustomerLayoutHeaderComponent } from './customer-layout/customer-layout-header/customer-layout-header.component';

@NgModule({
  declarations: [
    CustomerLayoutComponent,
    CustomerLayoutFooterComponent,
    CustomerLayoutHeaderComponent,
    CustomerHomeComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
