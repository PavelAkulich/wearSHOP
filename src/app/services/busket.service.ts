import { EventEmitter, Injectable } from '@angular/core';
import { ProductService } from './product.service';
import Product from './../model/product';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BusketService {
  public busketCnt: number = 0;
  public busketList = [];
  onClick: EventEmitter<any> = new EventEmitter();

  constructor(private auth: AuthService, public router: Router) {}

  public addToBusket(product) {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['sign-in']);
      return;
    }
    this.busketCnt++;
    this.busketList.push(product);
    this.onClick.emit(this.busketCnt);
    this.onClick.emit(this.busketList);
    this.auth.SetBusketUser(this.busketList);
    this.busketList = this.auth.GetBusketUser();
  }
  public removeFromBusket(id: number) {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['sign-in']);
      return;
    }
    this.busketCnt--;
    this.busketList.splice(id, 1);
    this.onClick.emit(this.busketCnt);
    this.onClick.emit(this.busketList);
    this.auth.SetBusketUser(this.busketList);
    this.busketList = this.auth.GetBusketUser();
  }

  firstInit() {
    if (this.auth.isLoggedIn) {
      console.log('wlfw,fwf,wf');
      this.busketList = this.auth.GetBusketUser();
      console.log(this.busketList);
      this.busketCnt = this.busketList.length;
    }
  }

  public contains(product) {
    return this.busketList.indexOf(product) != -1;
  }

  public getAveragePrice() {
    let price = 0;
    this.busketList.forEach((prod) => (price += (+prod.price)));
    console.log(price)
    return price
  }
}
