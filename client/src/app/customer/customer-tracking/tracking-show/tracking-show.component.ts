import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceCustomerService } from 'src/app/services/customer/invoice.customer.service';
import { Invoice } from "src/app/models/invoice.model";

@Component({
  selector: 'app-tracking-show',
  templateUrl: './tracking-show.component.html',
  styleUrls: ['./tracking-show.component.css']
})
export class TrackingShowComponent implements OnInit {

  // invoice: Invoice;
  state: any;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceCustomerService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.invoiceService.getInvoiceByID(params.get("orderid")).subscribe(res => {
        // this.invoice = res as Invoice;
        // window.alert(this.invoice.state);
        this.state = res.state;
      });
    });
  }

}
