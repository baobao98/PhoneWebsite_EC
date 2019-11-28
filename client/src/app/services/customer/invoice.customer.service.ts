import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceCustomerService {

  constructor(
    private http: HttpClient
  ) { }

  getInvoiceByID(_id: string): any {
    return this.http.get('/api/invoice' + `/${_id}`);
  }

}
