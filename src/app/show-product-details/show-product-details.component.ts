import {Component, OnInit} from '@angular/core';
import {ProductService} from "../_services/product.service";
import {Product} from "../_model/product.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ShowProductImagesDialogComponent} from "../show-product-images-dialog/show-product-images-dialog.component";
import {ImageProcessingServiceService} from "../_services/image-processing-service.service";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.scss']
})
export class ShowProductDetailsComponent implements OnInit {

  pageNumber:number=0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price', 'Actions',];
  showTable=false;
  showLoadProductButton=false;

  constructor(private productService: ProductService,
              public imagesDialog: MatDialog,
              private imageProcessingService: ImageProcessingServiceService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.showTable=false;
    this.productService.getAllProducts(this.pageNumber)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (resp: Product[]) => {
          //this.productDetails = resp;
          resp.forEach(product=>this.productDetails.push(product));
          this.showTable=true;
          console.log(this.productDetails);

          if(resp.length==100){
            this.showLoadProductButton=true;
          }else {
            this.showLoadProductButton=false;
          }

        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  deleteProduct(productId: any) {
    this.productService.deleteProduct(productId).subscribe(
      (resp: Product) => {
        console.log(resp);
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product) {
    console.log(product);
    // @ts-ignore
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });

  }

  editProductDetails(productId: any) {
    this.router.navigate(['/addNewProduct',{productId:productId}]);
  }

  LoadMoreProduct() {
    this.pageNumber=this.pageNumber+1;
    this.getAllProducts();
  }
}
