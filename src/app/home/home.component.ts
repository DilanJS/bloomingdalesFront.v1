import { Component, OnInit } from '@angular/core';
import {map} from "rxjs";
import {Product} from "../_model/product.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../_services/product.service";
import {ImageProcessingServiceService} from "../_services/image-processing-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productDetails: Product[] = [];

  constructor(private productService:ProductService,
              private imageProcessingService:ImageProcessingServiceService,
              ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts()
  .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          this.productDetails = resp;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
