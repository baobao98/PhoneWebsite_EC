import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ProductTypeDetailComponent } from '../product-type-detail/product-type-detail.component';
import { BaseListComponent } from 'src/app/common/base/base-list';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})
export class ProductTypeListComponent extends BaseListComponent implements OnInit {

  constructor(
    public dataService: DataService,
    private modalService: NzModalService,
  ) {
    super(dataService);
  }

  ngOnInit() {
    this.urlGetItems = '/api/typeproduct/';
    this.urlDeleteItem = '/api/typeproduct/';
    this.getList();
  }

  async getList(reset = false) {
    super.getList();
  }

  edit(model: any = null) {
    const modal = this.modalService.create({
      nzTitle: model && model.id ? 'Sửa loại sản phẩm' : 'Thêm loại sản phẩm',
      nzMaskClosable: false,
      nzWidth: 500,
      nzContent: ProductTypeDetailComponent,
      nzComponentParams: {
        params: {
          id: model ? model.id : '',
          operator: model ? ActionEnum.Update : ActionEnum.Add
        }
      },
      nzFooter: [{
        label: 'Huỷ bỏ',
        onClick: (component) => {
          component.cancel();
        }
      },
      {
        label: model && model.id ? 'Lưu' : 'Lưu',
        type: 'primary',
        onClick: (component) => {
          component.save();
        }
      }]
    });

    modal.afterClose.subscribe((result) => {
      if (result) {

      }
    });
  }

}
