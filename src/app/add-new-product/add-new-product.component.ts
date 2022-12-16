import {Component, OnInit} from '@angular/core';
import {Product} from "../_model/product.model";
import {NgForm} from "@angular/forms";
import {ProductService} from "../_services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import * as events from "events";
import {FileHandle} from "../_model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }

  constructor(private productService: ProductService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  addProduct(productForm: NgForm) {

    const productDormData=this.prepareFormDate(this.product);

    this.productService.addProduct(productDormData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages=[];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormDate(product: Product): FormData {
    const formDate = new FormData();
    formDate.append(
      'product',
      new Blob([JSON.stringify(product)], {type:'application/json'})
    );
    for (var i = 0; i < product.productImages.length; i++) {
      formDate.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    return formDate;
  }

  clear() {

  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file))
      }
      this.product.productImages.push(fileHandle);
    }

  }

  removeImages(i:number) {
    this.product.productImages.splice(i,1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }
}
