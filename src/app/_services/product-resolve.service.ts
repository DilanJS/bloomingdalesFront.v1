import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product} from "../_model/product.model";
import {map, Observable, of} from "rxjs";
import {ProductService} from "./product.service";
import {ImageProcessingServiceService} from "./image-processing-service.service";

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private productService: ProductService,
              private imageProcessingService:ImageProcessingServiceService
              ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {

    const id = route.paramMap.get("productId");

    if (id) {
      return this.productService.getProductDetailsById(id)
        .pipe(
          map(p=>this.imageProcessingService.createImages(p))
        );
    } else {
      return of(this.getProductDetails());
    }

  }

  getProductDetails() {
    return {
      productId:0,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []
    }
  }
}
