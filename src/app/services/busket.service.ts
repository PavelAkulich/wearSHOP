import { EventEmitter, Injectable } from '@angular/core';
import { ProductService } from './product.service';
import Product from './../model/product';

@Injectable({
  providedIn: 'root',
})
export class BusketService {
  private busketCnt: number = 0;
  private busketList = [];
  onClick: EventEmitter<any> = new EventEmitter();

  constructor(private productService: ProductService) {}

  public addToBusket(key: string) {
    this.busketCnt++;
    this.productService.getProdUnSub(key).then((doc) => {
      this.busketList.push({id: doc.id, ...doc.data()});
    });
    this.onClick.emit(this.busketCnt);
    this.onClick.emit(this.busketList);
  }
  public removeFromBusket(id: number) {
    this.busketCnt--;
    this.busketList.splice(id, 1);
    this.onClick.emit(this.busketCnt);
    this.onClick.emit(this.busketList);
  }
}
