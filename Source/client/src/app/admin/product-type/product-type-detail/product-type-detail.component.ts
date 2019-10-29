import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseDetailComponent } from 'src/app/common/base/base-detail';

@Component({
  selector: 'app-product-type-detail',
  templateUrl: './product-type-detail.component.html',
  styleUrls: ['./product-type-detail.component.css']
})
export class ProductTypeDetailComponent extends BaseDetailComponent implements OnInit {

  constructor(
    public modal: NzModalRef,
    public fb: FormBuilder
  ) {
    super(modal, fb);
  }

  ngOnInit() {
    super.ngOnInit();
    this.itemForm.addControl('name', new FormControl('', Validators.required));
    this.itemForm.addControl('no', new FormControl(1, Validators.required));
    this.itemForm.addControl('alias', new FormControl('', Validators.required));
  }

  save() {
    super.save();
    this.modal.destroy({ success: true });
  }

  cancel() {
    super.cancel();
    this.modal.destroy();
  }
}
