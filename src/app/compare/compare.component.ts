import { Component, Input, OnInit } from '@angular/core';
import { CompareService } from 'src/app/services/compare.service';
import { BusketService } from './../services/busket.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
 
  public showBusketProduct = false;
  public compareCount: any;
  public busketCount;

  constructor(public compare:CompareService,private share: BusketService,) {
    this.share.onClick.subscribe((cnt: any) => (this.busketCount = cnt));
    this.compare.onClick.subscribe((cnt: any)=>{
      return this.compareCount = cnt;
    });
  }

  ngOnInit(): void {}

  public deleteFromCompareList(key: number){
    this.compare.removeFromCompareList(key);
  }

  public addProdToBusket(product) {
    this.share.addToBusket(product);
  }

}
