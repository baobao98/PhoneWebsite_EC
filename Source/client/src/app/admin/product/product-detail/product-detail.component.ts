import { Component, OnInit } from '@angular/core';
import { BaseDetailComponent } from 'src/app/common/base/base-detail';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends BaseDetailComponent implements OnInit {

  constructor(
    public modal?: NzModalRef,
    public fb?: FormBuilder
  ) {
    super(modal, fb);
  }


  ngOnInit() {
  }

}
