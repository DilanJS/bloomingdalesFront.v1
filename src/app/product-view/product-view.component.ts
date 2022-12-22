import {Component, OnInit} from '@angular/core';
import {Product} from "../_model/product.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  selectedProductIndex = 0;

  product: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  };

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }


  changeIndex(index: number) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId: any) {
    this.router.navigate(['/buyProduct', {
      isSingleProduceCheckout: true,
      id: productId
    }]);
  }
}
