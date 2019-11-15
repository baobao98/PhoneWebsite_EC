import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductCustomerService } from 'src/app/services/customer/product.customer.service';
import { CartService } from 'src/app/services/customer/cart.customer.service';

@Component({
  selector: 'app-customer-product-detail',
  templateUrl: './customer-product-detail.component.html',
  styleUrls: ['./customer-product-detail.component.css']
})
export class CustomerProductDetailComponent implements OnInit {
  productDetail: Product;

  constructor(private productService: ProductCustomerService, private cartService: CartService) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductByID(this.productService.productID).subscribe(pro => {
      this.productDetail = pro as Product;
    })
  }

  addToCart() {
    this.cartService.addToCart(this.productDetail);
    window.alert('You added to cart: ' + this.productDetail.name);
  }

}
