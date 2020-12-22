import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { ProductService } from './../../services/product.service';

@Injectable()
export class DetailResolver implements Resolve<any> {

  constructor(public firebaseService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let prodId = route.paramMap.get('id');
      this.firebaseService.getProd(prodId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}