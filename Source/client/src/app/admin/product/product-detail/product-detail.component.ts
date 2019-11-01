import { Component, OnInit } from '@angular/core';
import { BaseDetailComponent } from 'src/app/common/base/base-detail';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends BaseDetailComponent implements OnInit {

  typeProducts: any = [];
  constructor(
    public modal?: NzModalRef,
    public fb?: FormBuilder
  ) {
    super(modal, fb);
  }


  ngOnInit() {

    super.ngOnInit();

    this.itemForm.addControl('name', new FormControl('', Validators.required));
    this.itemForm.addControl('price', new FormControl(0, Validators.required));
    this.itemForm.addControl('promotion', new FormControl(0, Validators.required));
    this.itemForm.addControl('typeProduct', new FormControl('', Validators.required));
    this.itemForm.addControl('imagePaths', new FormControl('', Validators.required));
    this.itemForm.addControl('quantity', new FormControl(0, Validators.required));
    this.itemForm.addControl('description', new FormControl('', Validators.required));
    this.itemForm.addControl('alias', new FormControl('', Validators.required));

  }



}
