import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {OrderDetails} from "../_model/order-details.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../_model/product.model";
import {ProductService} from "../_services/product.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] = [];

  orderDetails: OrderDetails = {

    fullName: "", address: "", contactNumber: "", orderProductQuantities: []
  }

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];

    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantities.push(
        {productId: x.productId, quantity: 1}
      )
    );

    console.log(this.productDetails)
    console.log(this.orderDetails)
  }

  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp) => {
        console.log(resp)
        orderForm.reset();
        this.router.navigate(['/orderConfirm']);
      },
      (error) => {
        console.log(error);

      }
    )
  }

  getQtyForProduct(productId: any) {
    const filteredProduct = this.orderDetails.orderProductQuantities.filter(
      (productQty) => productQty.productId === productId
    );
    return filteredProduct[0].quantity;
  }


  getTotal(productId: any, productDiscountedPrice: any) {
    const filteredProduct = this.orderDetails.orderProductQuantities.filter(
      (productQuantity) => productQuantity.productId === productId
    )
    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQtyChanged(value: any, productId: any) {
    this.orderDetails.orderProductQuantities.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = value;
  }

  getGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.orderProductQuantities.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal= grandTotal+price * productQuantity.quantity;
      }
    );
    return grandTotal;
  }
}
