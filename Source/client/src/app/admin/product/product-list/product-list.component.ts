import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/common/base/base-list';
import { NzModalService } from 'ng-zorro-antd';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseListComponent implements OnInit {

  constructor(
    public dataService: DataService,
    private modalService: NzModalService,
  ) {
    super(dataService);
  }

  ngOnInit() {
  }

  edit(model: any = null) {
    const modal = this.modalService.create({
      nzTitle: model && model.id ? 'Sửa loại sản phẩm' : 'Thêm loại sản phẩm',
      nzMaskClosable: false,
      nzWidth: 500,
      nzContent: ProductDetailComponent,
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
