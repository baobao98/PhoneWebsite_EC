import { Component, OnInit } from '@angular/core';

import { storeInfo } from 'src/app/models/storeInfo.model';
import { StoreInfoService } from 'src/app/services/customer/store-info.service';

@Component({
  selector: 'app-customer-layout-header',
  templateUrl: './customer-layout-header.component.html',
  styleUrls: ['./customer-layout-header.component.css']
})
export class CustomerLayoutHeaderComponent implements OnInit {
  info: storeInfo;

  constructor(private storeInfoService: StoreInfoService) { }

  ngOnInit() {
    this.getInfo();
  }

  async getInfo() {
    let info = await this.storeInfoService.getStoreInfo().subscribe((res) => {
      this.info = res[0] as storeInfo;
    })
  }





}
