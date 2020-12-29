import { Component, Input, OnInit } from '@angular/core';
import { CompareService } from 'src/app/services/compare.service';
import { BusketService } from './../../services/busket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public showBusketProduct = false;
  public busketCount: any;
  public compareCount: any;

  constructor(private share:BusketService, private compare:CompareService,) {
    this.share.onClick.subscribe((cnt: any)=>{
      return this.busketCount = cnt;
    });
    this.compare.onClick.subscribe((cnt: any)=>{
      return this.compareCount = cnt;
    });
  }

  ngOnInit(): void {}
  
  public showBuscket() {
    this.showBusketProduct = !this.showBusketProduct;
  }

  public deleteFromBusket(key: number){
    this.share.removeFromBusket(key);
  }
}
