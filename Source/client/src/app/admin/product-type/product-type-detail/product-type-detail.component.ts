import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-type-detail',
  templateUrl: './product-type-detail.component.html',
  styleUrls: ['./product-type-detail.component.css']
})
export class ProductTypeDetailComponent implements OnInit {

  @Input() params: any;
  itemForm: any;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: [],
      no: [1],
      alias: []
    });
  }

  save() {
    this.modal.destroy({ success: true });
  }

  cancel() {
    this.modal.destroy();
  }
}
