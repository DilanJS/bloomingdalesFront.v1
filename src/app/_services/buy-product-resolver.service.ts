import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product} from "../_model/product.model";
import {map, Observable} from "rxjs";
import {ProductService} from "./product.service";
import {ImageProcessingServiceService} from "./image-processing-service.service";

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(private productService:ProductService,
              private imageProcessingService:ImageProcessingServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> | Promise<Product[]> | Product[] {

    const id=route.paramMap.get("id");
    const isSingleProduceCheckout=route.paramMap.get("isSingleProduceCheckout");

    return this.productService.getProductDetails(isSingleProduceCheckout,id)
      .pipe(
        map(
          (x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product))
        )
      );
  }
}
