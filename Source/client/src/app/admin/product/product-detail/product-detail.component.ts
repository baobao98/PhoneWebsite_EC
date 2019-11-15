import { Component, OnInit } from '@angular/core';
import { BaseDetailComponent } from 'src/app/common/base/base-detail';
import { NzModalRef, UploadFile } from 'ng-zorro-antd';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { categoryService } from 'src/app/services/customer/category.customer.service';
import { ProductCustomerService } from 'src/app/services/customer/product.customer.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends BaseDetailComponent implements OnInit {

  isPhone = false;

  typeProducts: any = [];
  images = {
    imagePaths: {
      filesToUpload: [],
      downloading: false,
      uploading: false,
      base64Image: ''
    }
  };


  constructor(
    public modal?: NzModalRef,
    public fb?: FormBuilder,
    public categorySvc?: categoryService,
    public productSvc?: ProductCustomerService
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

    this.itemForm.addControl('isPhone', new FormControl(false));

    this.itemForm.addControl('imagePaths', new FormControl(''));


    this.itemForm.addControl('phoneInfo', this.fb.group({
      screenSize: [],
      frontCam: [],
      backCam: [],
      cpu: [],
      ram: [],
      storageCapacity: [],
      memoryCard: [],
      sim: [],
      os: [],
    }));

    if (this.params.action === ActionEnum.Update) {
      this.getItem(this.params._id);
    }
  }

  async getItem(id: string) {
    this.productSvc.getProductByID(id).subscribe(res => {
      console.log(res);
    });
  }


  // upload image
  beforeUploadImage = (file: UploadFile): boolean => {
    return this.beforeUpload(file, 'imagePaths');
  }

  beforeUpload(file: UploadFile, type: string) {
    this.images[type].filesToUpload = [...[file]];
    //kiểm tra kích thước file
    const isLt2M = file.size / 1024 / 1024 <= 2;
    if (!isLt2M) {
      this.notificationService.create('error', 'Hình ảnh không được lớn hơn 2MB!', '');
      return;
    }
    return false;
  }

  async handleUpload(formControlName: string) {
    const formData = new FormData();
    this.images[formControlName]['filesToUpload'].forEach((file: any) => {
      formData.append('files[]', file);
    });

    // call service đẩy hình ảnh lên server tại chỗ này

    // sau khi đấy lên thành công thì gán đường dẫn vào cái formcontrol là image
    this.itemForm.get('imagePaths').setValue(''); // thây  thế cái emty bằng path của hình ảnh vừa được tải lên
  }


}
