import { Component, OnInit } from '@angular/core';
import {map} from "rxjs";
import {Product} from "../_model/product.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../_services/product.service";
import {ImageProcessingServiceService} from "../_services/image-processing-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageNumber:number=0;

  productDetails: Product[] = [];

  showLoadButton=false;

  constructor(private productService:ProductService,
              private imageProcessingService:ImageProcessingServiceService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey:string=""){
    this.productService.getAllProducts(this.pageNumber,searchKey)
  .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          if(resp.length==10){
            this.showLoadButton=true;
          }else {
            this.showLoadButton=false;
          }
          resp.forEach(p=> this.productDetails.push(p));
          //this.productDetails = resp;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  showProductDetails(productId: any) {
    this.router.navigate(['/productView',{productId:productId}]);
  }

  loadMoreProduct() {
    this.pageNumber=this.pageNumber+1;
    this.getAllProducts();
  }

  searchByKeyword(searchKeyword: string) {
    this.pageNumber=0;
   this.productDetails=[];
   this.getAllProducts(searchKeyword);

  }
}
