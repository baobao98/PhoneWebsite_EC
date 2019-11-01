import { OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { ActionEnum } from '../enums/Actions.enum';

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

    if (this.params.action === ActionEnum.Update) {
      this.itemForm.addControl('id', new FormControl('', Validators.required));
    }

  }

  save() {
    this.modal.destroy({ success: true });
  }

  cancel() {
    this.modal.destroy();
  }

}
