import { EventEmitter, Injectable } from '@angular/core';
import { ProductService } from './product.service';
import Product from './../model/product';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  private compareCnt: number = 0;
  public compareList = [];
  onClick: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.compareList =localStorage.compareList ? JSON.parse(localStorage.getItem("compareList")):[];
  }

  public addToCompareList(product) {
    this.compareCnt++;
    this.compareList.push(product);
    this.onClick.emit(this.compareCnt);
    this.onClick.emit(this.compareList);
    localStorage.setItem("compareList", JSON.stringify(this.compareList))
  }
  public removeFromCompareList(id: number) {
    this.compareCnt--;
    this.compareList.splice(id, 1);
    this.onClick.emit(this.compareCnt);
    this.onClick.emit(this.compareList);
    localStorage.setItem("compareList", JSON.stringify(this.compareList))
  }

  public contains(product){
    return  this.compareList.indexOf(product) != -1;
  }

}
