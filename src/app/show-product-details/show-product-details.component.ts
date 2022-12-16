import { Component, OnInit } from '@angular/core';
import {ProductService} from "../_services/product.service";
import {Product} from "../_model/product.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ShowProductImagesDialogComponent} from "../show-product-images-dialog/show-product-images-dialog.component";
import {ImageProcessingServiceService} from "../_services/image-processing-service.service";
import {map} from "rxjs";

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.scss']
})
export class ShowProductDetailsComponent implements OnInit {

  productDetails:Product[]=[];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounted Price','Product Actual Price','Images','Edit','Delete'];

  constructor(private productService:ProductService,
              public imagesDialog:MatDialog,
              private imageProcessingService:ImageProcessingServiceService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts()
      .pipe(
        map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
      )
      .subscribe(
      (resp:Product[])=>{
        console.log(resp);
        this.productDetails=resp;
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  deleteProduct(productId:any) {
    this.productService.deleteProduct(productId).subscribe(
        (resp:Product)=>{
          console.log(resp);
          this.getAllProducts();
        },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  showImages(product:Product) {
    console.log(product);
    // @ts-ignore
    this.imagesDialog.open(ShowProductImagesDialogComponent,{
      data:{
        images:product.productImages
      },
      height:'500px',
      width:'800px'
    });

  }

  editProductDetails(productId: any) {
    console.log(productId);
  }
}
