import { OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';

export class BaseDetailComponent implements OnInit {

  itemForm: any;
  @Input() params: any;

  constructor(
    public modal?: NzModalRef,
    public fb?: FormBuilder
  ) { }

  ngOnInit() {
    this.itemForm = this.fb.group({
    });
  }

  save() {
    this.modal.destroy({ success: true });
  }

  cancel() {
    this.modal.destroy();
  }

}
