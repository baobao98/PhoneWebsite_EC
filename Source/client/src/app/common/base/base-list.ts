import { OnInit } from '@angular/core';

export class BaseListComponent implements OnInit {

  items: any = [];
  tableInfor: any = {
    loading: false,

    total: 10,
    pageIndex: 1,
    pageSize: 10,

  };
  constructor(

  ) { }

  ngOnInit() {
  }

  async getList(reset = false) {

  }

  async deleteRecord(id: any) {

  }

  async cancelDelete() {

  }
}
