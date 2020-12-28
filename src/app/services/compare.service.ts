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

  constructor() {}

  public addToCompareList(product) {
    this.compareCnt++;
    this.compareList.push(product);
    this.onClick.emit(this.compareCnt);
    this.onClick.emit(this.compareList);
  }
  public removeFromCompareList(id: number) {
    this.compareCnt--;
    this.compareList.splice(id, 1);
    this.onClick.emit(this.compareCnt);
    this.onClick.emit(this.compareList);
  }
}
